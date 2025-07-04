import React from "react";

const Contact = () => {
    return (
        <div className="flex flex-col items-center min-h-screen py-5 md:py-16 gap-6 md:gap-8">
            <div className="flex items-center gap-1">
                <h2 className="text-xl md:text-2xl text-gray-700 tracking-wide">
                    CONTACT <span className="text-black">US</span>
                </h2>
                <div className="h-[2px] bg-black w-8 sm:w-12"></div>
            </div>
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="w-full h-80 md:h-100">
                    <iframe
                        title="Map"
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3637.9270240542205!2d75.56478497560487!3d31.35265347429125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzA5LjYiTiA3NcKwMzQnMDIuNSJF!5e1!3m2!1sen!2sin!4v1751623073613!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="space-y-6 text-gray-800 text-base">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Address</h3>
                        <p>SM Metal Works</p>
                        <p>O-6 Industrial Area, Sodal Road, Jalandhar</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Phone</h3>
                        <p>+91 98140-62802</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p>manojsharma1825@gmail.com</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;