import { Fragment, useEffect, useRef, useState } from "react";
import { InputBox, VisiblePart, Left, SearchIcon, Center, SearchInput, Right, MicIcon, Autocomplete, Line, ResultLink, SearchIconMin, Microphone } from "../styled/common/search-x";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Bold } from "../styled/pages/search-page";
import { useNavigate } from "react-router-dom";
import getSearchResults from "../../util/get-search-results";

const MAX_INPUT = 40;
const RESULTS = "/search/results";

type SearchXProps = { initInputValue: string }

export default function SearchX(props: SearchXProps) {

    const { initInputValue } = props;

    const showAutocomp = useRef(false);
    const [input, setInput] = useState(initInputValue);
    const [activeLine, setActiveLine] = useState(0);
    const [visibleAutocomp, setVisibleAutocomplete] = useState(false);
    const [autocomplete, setAutocomplete] = useState(new Array());
    const [blockAutocomp, setBlockAutocomp] = useState(false);
    const navigate = useNavigate();
    const { transcript, listening, resetTranscript,
        browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => {
        if (listening) {
            setInput(transcript);
            if (autocomplete.length > 0) {
                setVisibleAutocomplete(true);
            }
        } else {
            resetTranscript();
        }
    }, [listening, transcript, resetTranscript]);

    useEffect(() => {
        if (!listening && input != "" && showAutocomp.current) {
            fetch("http://localhost:3001/data")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const results = getSearchResults(input, data, 10);
                    setAutocomplete(results);
                    toggleAutocomplete(results);
                });
        } else {
            showAutocomp.current = true;
        }
    }, [input, listening])

    function toggleAutocomplete(array: Array<{}>) {
        if (array.length > 0) {
            setVisibleAutocomplete(true);
        } else {
            setVisibleAutocomplete(false);
            setActiveLine(0);
        }
    }

    function submitResult() {
        if (input != "" && autocomplete.length > 0) {
            setVisibleAutocomplete(false);
            navigate(`${RESULTS}/${input}`);
        }
    }

    return (
        <Fragment>
            {/* FOR DEBUGGING: */}
            {/* <div style={{textAlign: "center"}}>{`input: ${input}`}</div>
            <div style={{textAlign: "center"}}>{`visibleAutocomp: ${visibleAutocomp}`}</div>
            <div style={{textAlign: "center"}}>{`autocomplete.length: ${autocomplete.length}`}</div>
            <div style={{textAlign: "center"}}>&nbsp;</div>
            <div style={{textAlign: "center"}}>{`listening: ${listening}`}</div>
            <div style={{textAlign: "center"}}>{`transcript: ${transcript}`}</div>
            <div style={{textAlign: "center"}}>&nbsp;</div> */}
            <InputBox>
                <VisiblePart>
                    <Left>
                        <SearchIcon src={'/assets/images/loupe.svg'} />
                    </Left>
                    <Center>
                        <SearchInput maxLength={MAX_INPUT} autoFocus value={input}
                            placeholder="Input a keywords or type a URL"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    submitResult();
                                } else if (e.key === "ArrowDown" && visibleAutocomp) {
                                    activeLine < 9 ? setActiveLine(activeLine + 1) : void (0);
                                } else if (e.key === "ArrowUp" && visibleAutocomp) {
                                    activeLine > 0 ? setActiveLine(activeLine - 1) : void (0);
                                }
                            }}
                            onInput={(e) => {
                                setInput(e.currentTarget.value);
                                if (e.currentTarget.value === "") {
                                    setAutocomplete(new Array());
                                    setVisibleAutocomplete(false);
                                    setActiveLine(0);
                                }
                            }}
                            onFocus={() => toggleAutocomplete(autocomplete)}
                            onBlur={() => {
                                if (!blockAutocomp) {
                                    setVisibleAutocomplete(false);
                                }
                            }}
                        />
                    </Center>
                    <Right>
                        {browserSupportsSpeechRecognition &&
                            <Microphone onClick={() => SpeechRecognition.startListening()}>
                                <MicIcon micActive={listening} src={'/assets/images/mic.svg'} />
                            </Microphone>}
                    </Right>
                </VisiblePart>
                <Autocomplete visibility={visibleAutocomp}
                    onMouseOver={() => setBlockAutocomp(true)}
                    onMouseOut={() => setBlockAutocomp(false)}
                >
                    {autocomplete.map((elm, i) => {
                        const otherTextPart = (elm.title.replace(new RegExp(input, "i"), ""))
                            .slice(0, MAX_INPUT - input.length);
                        return (
                            <Line key={i}>
                                <ResultLink
                                    onMouseOver={(e) => setActiveLine(i)}
                                    onClick={() => submitResult()}
                                    active={i === activeLine ? true : false}
                                // to={`${RESULTS}/${input}`}
                                >
                                    <SearchIconMin src={'/assets/images/loupe.svg'} />
                                    {input}<Bold>{otherTextPart}</Bold>...
                                </ResultLink>
                            </Line>
                        );
                    })}
                </Autocomplete>
            </InputBox>
        </Fragment>
    );
}

