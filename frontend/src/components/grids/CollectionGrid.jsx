import React from "react";
import CollectionCard from "../cards/CollectionCard";

const CollectionGrid = () => {
    return (
        <div className="w-full py-6 px-2 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-18 max-w-screen-xl w-full justify-items-center">
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
                <CollectionCard />
            </div>
        </div>
    );
};

export default CollectionGrid;
