import React, { useState } from 'react';
import DICEcalc from './DICEcalc';
import IoUcalc from './IoUcalc';
import { Input, Button } from '@ohif/ui';


const debug = 0;
var assessment: String = '';
var dice = -1;
var jaccard = -1;
//like = 1, dislike = 2, none = 0
var like = 0;

function MetricsSidePanelComponent() {
    const [disableDislike, setIsLikeDisabled] = useState(false);
    const toggleDislike = () => {
        setIsLikeDisabled(!disableDislike);
    };

    const [disableLike, setIsDislikeDisabled] = useState(false);
    const toggleLike = () => {
        setIsDislikeDisabled(!disableLike);
    };

    return (
        <div className="text-white w-full text-center">
            <div id="dice_field">
                {`Dice Similarity Coeficient: ${dice}`}
            </div>

            <div id="jaccard_field">
                {`Intersection-over-Union: ${jaccard}`}
            </div>
            <Button
                onClick={function assingDICEValue() {
                    dice = DICEcalc();
                    var field_element = document.getElementById("dice_field");
                    field_element.textContent = `Dice Similarity Coeficient: ${dice}`;
                    jaccard = IoUcalc();
                    var field_element = document.getElementById("jaccard_field");
                    field_element.textContent = `Intersection-over-Union: ${jaccard}`;
                }}>
                Calculate
            </Button>

            <div style={{ marginBottom: '1em', marginTop: '5em' }}>
                <div>
                    {`Professional assessment:`}
                </div>
                <div className="flex space-x-2" style={{ marginLeft: '2em', marginTop: '1em' }}>
                    <Button id="likeButton" disabled={disableLike} variant="contained" color="default" startIcon={
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clip-rule="evenodd" />
                        </svg>
                    } onClick={toggleDislike}></Button>
                    <Button id="dislikeButton" disabled={disableDislike} variant="contained" color="default" startIcon={
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8.97 14.316H5.004c-.322 0-.64-.08-.925-.232a2.022 2.022 0 0 1-.717-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.201C5.769 3.54 5.96 3 7.365 3c2.072 0 4.276.678 6.156 1.256.473.145.925.284 1.35.404h.114v9.862a25.485 25.485 0 0 0-4.238 5.514c-.197.376-.516.67-.901.83a1.74 1.74 0 0 1-1.21.048 1.79 1.79 0 0 1-.96-.757 1.867 1.867 0 0 1-.269-1.211l1.562-4.63ZM19.822 14H17V6a2 2 0 1 1 4 0v6.823c0 .65-.527 1.177-1.177 1.177Z" clip-rule="evenodd" />
                        </svg>
                    } onClick={toggleLike}></Button>
                </div>
            </div>
            <div style={{ marginTop: '1em' }}>
                <Input
                    label="Additional details:"
                    onChange={function noRefCheck() { }}
                    onFocus={function noRefCheck() { }}
                    onKeyDown={function noRefCheck() { }}
                    onKeyPress={function noRefCheck() { }}
                />
            </div>
        </div>
    );
}

export default MetricsSidePanelComponent;