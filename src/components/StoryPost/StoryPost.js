import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./StoryPost.module.css";
import close from "../../assets/icons/close.png";
import share from "../../assets/icons/share.png";
import unLike from "../../assets/icons/unlike.png";
import liked from "../../assets/icons/liked.png";
import storyBookmark from "../../assets/icons/story-bookmark.png";
import storyBookmarked from "../../assets/icons/bookmarked.png";
import { unSetStory } from "../../slices/storySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { setLogin } from "../../slices/loginSlice";
import Login from "../Login/Login";
import {
  updateLikesOnStoryPost,
  getLikesOnStory,
  updateBookmarkOnStory,
  getBookmarkOnStory,
  getStory,
} from "../../apis/storyAuth";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";

function StoryPost() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // const storyState = useSelector((state) => state.story);
  const userState = useSelector((state) => state.user);
  const loginState = useSelector((state) => state.login);

  // const [isLoggedIn, setIsLoggedIn] = useState(loginState.value);
  const [storyDetails, setStoryDetails] = useState();
  const [storySlider, setStorySlider] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [storyLink, setStoryLink] = useState("");

  console.log("StoryDetails", storyDetails);
  console.log("useParamsid", id);

  const sliderArray = () => {
    let arr = [];
    if (storyDetails?.slide1?.length === 3) {
      arr.push(storyDetails.slide1);
    }
    if (storyDetails?.slide2?.length === 3) {
      arr.push(storyDetails.slide2);
    }
    if (storyDetails?.slide3?.length === 3) {
      arr.push(storyDetails.slide3);
    }
    if (storyDetails?.slide4?.length === 3) {
      arr.push(storyDetails.slide4);
    }
    if (storyDetails?.slide5?.length === 3) {
      arr.push(storyDetails.slide5);
    }
    if (storyDetails?.slide6?.length === 3) {
      arr.push(storyDetails.slide6);
    }

    setStorySlider([...arr]);
  };

  const fetchStoryPost = async (id) => {
    const result = await getStory({ id: id });
    console.log("result", result);
    setStoryDetails(result);
    // dispatch(setStory(result));
  };

  const getLikes = async () => {
    const result = await getLikesOnStory(storyDetails?._id, userState?.value);

    setLikesCount(result?.likesCount);
    setIsLiked(result?.isLiked);
  };

  const getBookmark = async () => {
    const result = await getBookmarkOnStory(
      storyDetails?._id,
      userState?.value
    );

    setIsBookmarked(result?.isBookmarked);
  };

  const createStoryLink = () => {
    let link = "http://localhost:3000/view-story/" + storyDetails?._id;
    setStoryLink(link);
  };

  useEffect(() => {
    sliderArray();
  }, [storyDetails]);

  useEffect(() => {
    // getLikes();
    // getBookmark();
  }, [loginState.value]);

  useEffect(() => {
    fetchStoryPost(id);
    // getLikes();
    // getBookmark();
    createStoryLink();
  }, []);

  const handleLike = async (likeStatus) => {
    console.log("likeStatus", likeStatus);
    if (userState.value === null) {
      dispatch(setLogin());
      return;
    }

    const result = await updateLikesOnStoryPost(storyDetails?._id, likeStatus);
    getLikes();
  };

  const handleBookmark = async (bookmarkStatus) => {
    console.log("bookmarkStatus", bookmarkStatus);
    if (userState.value === null) {
      dispatch(setLogin());
      return;
    }

    const result = await updateBookmarkOnStory(
      storyDetails?._id,
      bookmarkStatus
    );
    getBookmark();
  };

  console.log("storySlider", storySlider);

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        style={{
          width: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {storySlider.map((item) => {
          return (
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={styles.story}>
                <div className={styles.topSubContainer}>
                  <img
                    className={styles.images}
                    src={close}
                    onClick={() => dispatch(unSetStory())}
                  />
                  <CopyToClipboard
                    text={storyLink}
                    onCopy={() => alert("Link copied to clipboard")}
                  >
                    <img className={styles.images} src={share} />
                  </CopyToClipboard>
                </div>
                <div className={styles.bottomSubContainer}>
                  <h4 className={styles.heading}>{item[0]}</h4>
                  <p className={styles.description}>{item[1]}</p>
                  <div className={styles.imgContainer}>
                    {isBookmarked === false ? (
                      <img
                        id="not-bookmarked"
                        src={storyBookmark}
                        onClick={(e) => handleBookmark(e.target.id)}
                      />
                    ) : (
                      <img
                        id="bookmarked"
                        src={storyBookmarked}
                        onClick={(e) => handleBookmark(e.target.id)}
                      />
                    )}

                    <div>
                      {isLiked === false ? (
                        <img
                          id="unliked"
                          src={unLike}
                          onClick={(e) => handleLike(e.target.id)}
                        />
                      ) : (
                        <img
                          id="liked"
                          src={liked}
                          onClick={(e) => handleLike(e.target.id)}
                        />
                      )}
                      &nbsp;&nbsp;{likesCount}
                    </div>
                  </div>
                  <img src={item[2]} className={styles.picture} />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {loginState.value === 1 && <Login />}
    </div>
  );
}

export default StoryPost;