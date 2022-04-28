import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { InputBox, VisiblePart, Left, SearchIcon, Center, SearchInput, Right, MicIcon, Autocomplete, Line, ResultLink, SearchIconMin, Microphone, RemoveLink } from "../styled/common/search-x";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Bold } from "../styled/pages/search-page";
import { useNavigate } from "react-router-dom";
import getSearchResults from "../../util/get-search-results";
import { Context } from "../../store/context";
import { RESULTS_ROUTE, MAX_INPUT, SERVER_HTTP, MAX_RESULTS, LOUPE_PATH, PLACEHOLDER, MIC_PATH } from "../../config/main-config";

type SearchXProps = { initInputValue: string }

export default function SearchX(props: SearchXProps) {

    const { initInputValue } = props;

    const context = useContext(Context);
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
            fetch(SERVER_HTTP)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const results = getSearchResults(input, data, MAX_RESULTS);
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
            navigate(`${RESULTS_ROUTE}/${input}/${autocomplete[activeLine].id}`);
        }
    }

    function removeFromRecent(id: string) {
        const ids = context.recentlySearchedIds;
        if (ids.indexOf(id) !== -1) {
            const newIds = ids.filter((elm) => elm !== id);
            context.changeRecentlySearchedIds(newIds);
        }
    }

    return (
        <InputBox>
            <VisiblePart>
                <Left>
                    <SearchIcon src={LOUPE_PATH} />
                </Left>
                <Center>
                    <SearchInput maxLength={MAX_INPUT} autoFocus value={input}
                        placeholder={PLACEHOLDER}
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
                            <MicIcon micActive={listening} src={MIC_PATH} />
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
                        <Line key={i}
                            onMouseOver={(e) => setActiveLine(i)}
                            active={i === activeLine ? true : false}
                        >
                            <ResultLink
                                recentlySearched={context.recentlySearchedIds.indexOf(elm.id) !== -1 ? true : false}
                                onClick={() => submitResult()}
                            >
                                <SearchIconMin src={LOUPE_PATH} />
                                {input}<Bold>{otherTextPart}</Bold>...
                            </ResultLink>
                            {context.recentlySearchedIds.indexOf(elm.id) !== -1
                                && <RemoveLink onClick={() => removeFromRecent(elm.id)}>Remove</RemoveLink>}
                        </Line>
                    );
                })}
            </Autocomplete>
        </InputBox>
    );
}

