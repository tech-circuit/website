import React, { useState } from "react";

const Tags = () => {    
    const [tags, setTags] = useState([]);

    const addTag = (e) => {
        if (
            e.keyCode === 32 &&
            e.target.value.trim() !== "" &&
            tags.length !== 5
        ) {
            setTags([...tags, e.target.value.trim()]);
            e.target.value = "";
            setTimeout(() => {
                e.target.value = "";
            }, 10);
        }
    };

    const removeTag = (inpTag) => {
        setTags(tags.filter((tag) => tag !== inpTag));
    };

    return(
        <>
        <h3>Tags</h3>
        <div className="tags-hold">
            {tags.map((tag) => {
                return (
                    <div className="tag" key={tag}>
                        {tag}
                        <img
                            src="/assets/tag-cross.svg"
                            alt="tag-cross"
                            className="tag-cross"
                            onClick={() => removeTag(tag)}
                        />
                    </div>
                );
            })}
            {tags.length !== 5 ? (
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    autoComplete="off"
                    onKeyDown={(eve) => addTag(eve)}
                    onFocus={(e) => {
                        e.target.parentElement.classList.add(
                            "tags-hold-focus"
                        );
                    }}
                    onBlur={(e) => {
                        e.target.parentElement.classList.remove(
                            "tags-hold-focus"
                        );
                    }}
                />
            ) : (
                document
                    .querySelector(".tags-hold")
                    .classList.remove("tags-hold-focus")
            )}
        </div>
        </>
    )
}

export default Tags;