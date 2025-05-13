import { useEffect, useState } from "react";
import {
  Navbar,
  Footer,
  Readless,
  Alert,
  Spinner,
  SearchBlog,
  Dropdown,
} from "../shared/components";
import "./Component.scss";
import {
  BACKEND_BASE_URL,
  BLOG_URL,
  BLOG_LIMIT,
  HOME,
  HOME_SEARCH,
} from "../constants";
import { apiHandler, trimElement } from "../shared/utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [limit, setLimit] = useState(3);
  const [active, setActive] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isDisabledNext, setDisabledNext] = useState(false);
  const [isDisabledPrev, setDisabledPrev] = useState(false);
  const [isSearched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [pagination, setPagination] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { isHomeClick } = useSelector((state) => state.navbar);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const nextHandler = () => {
    const totalCountPagination = Math.ceil(totalCount / 3);
    if (totalCountPagination > limit) {
      if (totalCountPagination - limit < 3) setLimit(totalCountPagination);
      else setLimit(limit + 3);
    }
  };

  const prevHandler = () => {
    if (limit > 3) {
      if (limit % 3 === 0) setLimit(limit - 3);
      else if (limit % 3 === 2) setLimit(limit - 2);
      else setLimit(limit - 1);
    }
  };

  const limitHandler = async (count) => {
    setActive(count);
    const response = await apiHandler(
      "",
      "",
      "HOME",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_LIMIT,
      searchInput,
      parseInt(count * 3)
    );
    if (response?.data?.totalCount) {
      if (count * 3 - 2 > response.data.totalCount) {
      } else {
        setTotalCount(response?.data?.totalCount);
        setBlogs([...response?.data?.limitBlogs]);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    setLocation("");
    const isSearchContent = trimElement(searchInput);
    if (isSearchContent) setSearched(!isSearched);
  };

  const handleDisableButton = () => {
    const totalCountPagination = Math.ceil(totalCount / 3);
    setDisabledNext(totalCountPagination <= limit);
    setDisabledPrev(limit <= 3);
  };

  const handleLocation = (event) => {
    setSearchInput("");
    setLocation(event.target.value);
  };

  const fetchBlogs = async () => {
    const response = await apiHandler(
      "",
      "",
      "HOME",
      BACKEND_BASE_URL,
      BLOG_URL,
      BLOG_LIMIT,
      location,
      searchInput,
      parseInt(active * 3)
    );
    if (response?.data?.totalCount) {
      if (active * 3 - 2 > response.data.totalCount) setActive(1);
    } else setActive(1);

    setPagination((prevPagination) => {
      let limitPagination = 3;
      if (response.data.totalCount <= 3) {
        limitPagination = 1;
        setLimit(3);
      } else if (response.data.totalCount <= 6) {
        limitPagination = 2;
        setLimit(6);
      } else limitPagination = limit;
      const pagination = [];
      for (let i = 0; i < limitPagination; i++) {
        if (i + 1 > limitPagination - 3) {
          pagination.push(i + 1);
        }
      }
      return pagination;
    });

    setTotalCount(response?.data?.totalCount);
    setBlogs([...response?.data?.limitBlogs]);
  };

  useEffect(() => {
    setLocation("");
    setSearchInput("");
    setSearched(!isSearched);
    setLimit(3);
    setActive(1);
  }, [isHomeClick]);

  useEffect(() => {
    fetchBlogs();
  }, [limit, active]);

  useEffect(() => {
    if (searchInput.trim()) {
      navigate(HOME_SEARCH);
    } else {
      navigate(HOME);
    }
    fetchBlogs();
  }, [isSearched]);

  useEffect(() => {
    if (location) {
      navigate(`${HOME}/${location}`);
    } else {
      navigate(HOME);
    }
    fetchBlogs();
  }, [location]);

  useEffect(() => {
    handleDisableButton();
  }, [limit, totalCount]);

  return (
    <>
      <Navbar />
      {/* <div style={{border:"2px solid red", height:"300px" ,width:'5000px', backgroundRepeat:'no-repeat',  backgroundImage: 
'url(data:image/jpeg;base64,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)'
      }}> */}
        <img style={{height:"300px"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO32ztgwOIaYk781-BhGlbUHs_Fb5yLW_mnw&s" alt="" />
      {loading && <Spinner />}
     
      {/* <img
        onLoad={handleImageLoad}
        src="https://shorturl.at/I2367"
        alt="welcome"
      /> */}
    
      {/* </div> */}
      <div  style={{ height:'50%', width:'80%'}} className="filter-blogs">
        <SearchBlog
          searchInput={searchInput}
          handleSearch={handleSearch}
          handleClickSearch={handleClickSearch}
        />
        <Dropdown handleLocation={handleLocation} location={location} />
      </div>
   
      <div className="outer-box-home">
        {blogs.length !== 0 &&
          blogs.map((element, idx) => {
            return (
              <Readless
                key={idx}
                title={element.title}
                topic={element.topic}
                desc={element.desc}
                media={element.media}
                userId={element.userId}
                id={element._id}
              />
            );
          })}
      </div>
      {totalCount ? (
        <div className="pagination">
          <div
            className={isDisabledPrev ? "disabledPrev" : "prev"}
            onClick={prevHandler}
          >
            &laquo; Prev
          </div>
          {pagination.map((count, idx) => {
            if (idx + 1)
              return (
                <div
                  onClick={() => limitHandler(count)}
                  className={`page ${active === count && "active"}`}
                  key={idx}
                >
                  {count}
                </div>
              );
            return null;
          })}
          <div
            className={isDisabledNext ? "disabledNext" : "next"}
            onClick={nextHandler}
          >
            Next &raquo;
          </div>
        </div>
      ) : (
        <Alert msg="Sorry, no blog result! please try with other keyword" />
      )}
      <Footer />
    </>
  );
};
