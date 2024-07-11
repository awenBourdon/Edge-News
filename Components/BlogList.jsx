"use client"
import BlogItem from "./BlogItem"
import { useState, useEffect } from "react"
import axios from "axios"

const BlogList = () => {

    const [menu, setMenu] = useState("Tout Voir");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get("/api/blog");
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    };

    useEffect(() => {
        fetchBlogs();
    },[]);

  return (
    <div>
        <span className="flex m-auto items-center py-10 max-w-[80vw]">
         <span className="pr-6 text-5xl font-bold">ARTICLES</span>
            <span className="h-2 flex-1 bg-black"></span>
        </span>
        <div className="flex justify-center gap-6 my-10">
            <button onClick={()=>setMenu("Tout Voir")} className={menu==="Tout Voir"?"bg-black text-white py-1 px-4 rounded-3xl":""}>Tout Voir</button>
            <button onClick={()=>setMenu("Tech")} className={menu==="Tech"?"bg-black text-white py-1 px-4 rounded-3xl":""} >Tech</button>
            <button onClick={()=>setMenu("Design")} className={menu==="Design"?"bg-black text-white py-1 px-4 rounded-3xl":""} >Design</button>
            <button onClick={()=>setMenu("Lifestyle")} className={menu==="Lifestyle"?"bg-black text-white py-1 px-4 rounded-3xl":""} >Lifestyle</button>
        </div>
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
            {blogs.filter((item) => menu ==="Tout Voir"?true:item.category===menu ).map((item, index) => {
                return <BlogItem key={index} id={item._id} image={item.image} title={item.title}  description={item.description}  category={item.category}  />
            })}
        </div>
    </div>
  )
}

export default BlogList