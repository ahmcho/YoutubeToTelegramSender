import React from "react";

const Loader = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-white h-16 w-16"></div>
    </div>
);

export default Loader;