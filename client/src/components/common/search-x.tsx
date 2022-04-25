import { useEffect, useState } from "react";
import { InputBox, VisiblePart, Left, SearchIcon, Center, SearchInput, Right, MicIcon, Autocomplete, Line, ResultLink, SearchIconMin } from "../styled/common/search-x";

export default function SearchX() {

    const [input, setInput] = useState("");
    const [activeLine, setActiveLine] = useState(0);
    const [autocomplete, toggleAutocomplete] = useState(false)

    useEffect(() => {
        // alert(input);
    });

    return (
        <InputBox>
            <VisiblePart>
                <Left>
                    <SearchIcon src={'assets/images/loupe.svg'} />
                </Left>
                <Center>
                    <SearchInput autoFocus value={input}
                        placeholder="Input a keywords or type a URL"
                        onInput={(e) => {
                            setInput(e.currentTarget.value);
                            if (e.currentTarget.value !== "") {
                                toggleAutocomplete(true);
                            } else {
                                toggleAutocomplete(false);
                            }
                        }}
                        onFocus={(e) => {
                            if (e.currentTarget.value !== "") {
                                toggleAutocomplete(true);
                            }
                        }}
                        onBlur={(e) => toggleAutocomplete(false)}
                    />
                </Center>
                <Right>
                    <MicIcon src={'assets/images/mic.svg'} />
                </Right>
            </VisiblePart>
            <Autocomplete visibility={autocomplete}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((eml, i) => {
                    return (
                        <Line>
                            <ResultLink
                                onMouseOver={(e) => setActiveLine(i)}
                                active={i === activeLine ? true : false}
                                to="/search/results"
                            >
                                <SearchIconMin src={'assets/images/loupe.svg'} />
                                Result line {i}
                            </ResultLink>
                        </Line>
                    );
                })}
            </Autocomplete>
        </InputBox>
    );
}

