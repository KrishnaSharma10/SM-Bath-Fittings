import React from "react";
import TitleCard from "../components/cards/TitleCard";
import { assets } from "../assets/assets";

const Collection = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 p-6">
            <TitleCard
                title="FAUCETS"
                summary="A perfect blend of style and utility"
                image={assets.faucet1}
            />
            <TitleCard
                title="BATHROOM SETS"
                summary="A perfect blend of style and utility"
                image={assets.bathset}
            />
            <TitleCard
                title="BATH ESSENTIALS"
                summary="A perfect blend of style and utility"
                image={assets.bathessentials}
            />
        </div>
    );
};

export default Collection;
