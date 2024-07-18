"use client"
import BlogList from "@/Components/BlogList";
import NavBar from "@/Components/NavBar";
import Newsletter from "@/Components/Newsletter";
import Cta from "@/Components/Cta";
import ToTop from "@/Components/ToTop";
import ScrollingMessage from "@/Components/ScrollingMessage";
import Modal from "@/Components/Modal";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify";
import ProgressBar from "@/Components/ProgressBar";


export default function Home() {
  return (
    <>
    <ToastContainer theme="dark" />
    <ProgressBar className="fixed top-0 left-0 right-0 z-10" />
    <NavBar/>
    <Cta/>
    <ToTop/>
    <BlogList/>
    <Newsletter/>
    <Modal/>
    <ScrollingMessage/>
    <Footer/>
    </>
  );
}
