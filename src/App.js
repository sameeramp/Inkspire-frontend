import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {
//   Login,
//   Register,
//   Home,
//   Media,
//   Contact,
//   CreateBlog,
//   ShowBlogs,
//   ShowOneFullBlog,
//   UpdateBlog,
//   NotFoundPage,
// } from "./components";
import { Login} from "./components/login/Component.jsx";
import {   Register,
} from "./components/register/Component.jsx";
import { Media} from "./components/media";
import { Contact} from "./components/contact";
import {
  HOME,
  HOME_SEARCH,
  HOME_LOCATION,
  LOGIN,
  REGISTER,
  MEDIA,
  MEDIA_SEARCH,
  MEDIA_LOCATION,
  CONTACT,
  CREATE_BLOGS,
  SHOW_BLOGS,
  SHOW_BLOGS_SEARCH,
  SHOW_BLOGS_LOCATION,
  BLOG_DETAILS,
  UPDATE_BLOGS,
  NOT_FOUND,
} from "./components/constants";
import { Home } from "./components/home/Component.jsx";
import { CreateBlog } from "./components/blog/createBlog/index.js";
import { ShowBlogs } from "./components/blog/showBlogs/index.js";
import { UpdateBlog } from "./components/blog/updateBlog/index.js";
import { ShowOneFullBlog } from "./components/blog/showOneFullBlog/index.js";
import {NotFoundPage} from './components/notFoundPage/index.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path={HOME} element={<Home />} />
        <Route path={HOME_SEARCH} element={<Home />} />
        <Route path={HOME_LOCATION} element={<Home />} />

        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />

        <Route path={MEDIA} element={<Media />} />
        <Route path={MEDIA_SEARCH} element={<Media />} />
        <Route path={MEDIA_LOCATION} element={<Media />} />

        <Route path={CONTACT} element={<Contact />} />
        <Route path={CREATE_BLOGS} element={<CreateBlog />} />

        <Route path={SHOW_BLOGS} element={<ShowBlogs />} />
        <Route path={SHOW_BLOGS_SEARCH} element={<ShowBlogs />} />
        <Route path={SHOW_BLOGS_LOCATION} element={<ShowBlogs />} />

        <Route path={BLOG_DETAILS} element={<ShowOneFullBlog />} />
        <Route path={UPDATE_BLOGS} element={<UpdateBlog />} />

        <Route path={NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
