import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./AskQuestion.css";
import { askQuestion } from "../../actions/question";
import { faBold, faItalic, faUnderline, faListUl, faListOl, faLink, faAlignLeft, faAlignCenter, faAlignRight, faAlignJustify, faImage, faVideo, faCode } from '@fortawesome/free-solid-svg-icons';

const AskQuestion = ({isDay}) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [questionTags, setQuestionTags] = useState("");

  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const handleButtonClick = (format) => {
    if (format === 'createLink') {
      let urlLink = prompt('Enter the link here:', 'http://');
      if (urlLink !== null) {
        const linkHtml = `<a href="${urlLink}" target="_blank">${urlLink}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      }

    }
    else if (format === 'insertImage') {
      let urlImage = prompt('Enter the image link here:', 'http://');
      if (urlImage !== null && urlImage !== "") {
        const img = document.createElement("img");
        img.src = urlImage;
        img.style.maxWidth = "50%";
        editorRef.current.focus();
        editorRef.current.ownerDocument.execCommand('insertHTML', false, img.outerHTML);
      }

    } else if (format === 'insertVideo') {
      let videoLink = prompt('Enter the YouTube video link:', '');
      if (videoLink !== null) {
        const videoId = extractYouTubeVideoId(videoLink);
        if (videoId) {
          const videoHtml = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
          document.execCommand('insertHTML', false, videoHtml);
        } else {
          alert('Invalid YouTube video link. Please enter a valid link.');
        }
      }
    } else if (format === 'insertCodeBlock') {
      const codeBlock = document.createElement('pre');
      const codeElement = document.createElement('code');
      codeElement.textContent = 'Enter your code here';
      codeBlock.appendChild(codeElement);
      editorRef.current.focus();
      editorRef.current.ownerDocument.execCommand('insertHTML', false, codeBlock.outerHTML);
    }
    else {
      document.execCommand(format, false, null);
    }


  }
  const handleLinkClick = (e) => {

    let target = e.target;
    while (target) {
      if (target.tagName === 'A' && target.href) {
        window.open(target.href, '_blank');
        break;
      }
      target = target.parentElement;
    }
  };

  const handleLinkHover = (e) => {

    let target = e.target;
    while (target) {
      if (target.tagName === 'A') {
        target.classList.toggle('link-hover');
        break;
      }
      target = target.parentElement;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User) {
      if (questionTitle && questionBody && questionTags) {

        const parsedQuestionBody = parseContent(questionBody);

        dispatch(
          askQuestion(
            {
              questionTitle,
              questionBody: parsedQuestionBody,
              questionTags,
              userPosted: User.result.name,
            },
            navigate
          )
        );
      } else alert("Please enter all the fields");
    } else alert("Login to ask question");
  };

  const parseContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const links = doc.querySelectorAll('a');
    links.forEach((link) => {
      link.setAttribute('target', '_blank');
    });

    const images = doc.querySelectorAll('img');
    images.forEach((image) => {
      image.style.maxWidth = '50%';
    });

    const iframes = doc.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src');
      const isYouTubeVideo = src && src.includes('youtube.com');

      if (isYouTubeVideo) {

        iframe.setAttribute('width', '560');
        iframe.setAttribute('height', '315');
      } else {

        const newVideoPlaceholder = document.createElement('div');
        newVideoPlaceholder.className = 'video-placeholder';
        newVideoPlaceholder.textContent = `Video Link: ${src}`;
        iframe.parentNode.replaceChild(newVideoPlaceholder, iframe);
      }
    });

    return doc.body.innerHTML;
  };






  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionBody(questionBody + "\n");
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener('click', handleLinkClick);
      editorRef.current.addEventListener('mouseover', handleLinkHover);
      editorRef.current.addEventListener('mouseout', handleLinkHover);
    }


    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener('click', handleLinkClick);
        editorRef.current.removeEventListener('mouseover', handleLinkHover);
        editorRef.current.removeEventListener('mouseout', handleLinkHover);
      }
    };
  }, []);
  return (
    <div className={`ask-question ${isDay ? 'day' : 'night'}`}>
      <div className={`ask-ques-container ${isDay ? 'day' : 'night'}`}>
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className={`ask-form-container ${isDay ? 'day' : 'night'}`}>
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>
                Be specific and imagine you’re asking a question to another
                person
              </p>
              <input
                type="text"
                id="ask-ques-title"
                onChange={(e) => {
                  setQuestionTitle(e.target.value);
                }}
                placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
              />
            </label>
            <label htmlFor="ask-ques-body">
              <h4>Body</h4>
              <p>
                Include all the information someone would need to answer your
                question
              </p>
              {/* <textarea
                name=""
                id="ask-ques-body"
                onChange={(e) => {
                  setQuestionBody(e.target.value);
                }}
                cols="30"
                rows="10"
                onKeyPress={handleEnter}
              ></textarea> */}
              <div className="main-content">
                <div className="text-editor-header">
                  <button type="button" className="btn" data-element="bold" onClick={() => handleButtonClick("bold")}>
                    <FontAwesomeIcon icon={faBold} />
                  </button>
                  <button type="button" className="btn" data-element="italic" onClick={() => handleButtonClick("italic")}>
                    <FontAwesomeIcon icon={faItalic} />
                  </button>
                  <button type="button" className="btn" data-element="underline" onClick={() => handleButtonClick("underline")}>
                    <FontAwesomeIcon icon={faUnderline} />
                  </button>
                  <button type="button" className="btn" data-element="insertUnorderedList" onClick={() => handleButtonClick("insertUnorderedList")}>
                    <FontAwesomeIcon icon={faListUl} />
                  </button>
                  <button type="button" className="btn" data-element="insertOrderedList" onClick={() => handleButtonClick("insertOrderedList")}>
                    <FontAwesomeIcon icon={faListOl} />
                  </button>
                  <button type="button" className="btn" data-element="createLink" onClick={() => handleButtonClick("createLink")}>
                    <FontAwesomeIcon icon={faLink} />
                  </button>
                  <button type="button" className="btn" data-element="justifyLeft" onClick={() => handleButtonClick("justifyLeft")}>
                    <FontAwesomeIcon icon={faAlignLeft} />
                  </button>
                  <button type="button" className="btn" data-element="justifyCenter" onClick={() => handleButtonClick("justifyCenter")}>
                    <FontAwesomeIcon icon={faAlignCenter} />
                  </button><button type="button" className="btn" data-element="justifyRight" onClick={() => handleButtonClick("justifyRight")}>
                    <FontAwesomeIcon icon={faAlignRight} />
                  </button>
                  <button type="button" className="btn" data-element="justifyFull" onClick={() => handleButtonClick("justifyFull")}>
                    <FontAwesomeIcon icon={faAlignJustify} />
                  </button>
                  <button type="button" className="btn" data-element="insertVideo" onClick={() => handleButtonClick("insertVideo")}>
                    <FontAwesomeIcon icon={faVideo} />
                  </button>
                  <button type="button" className="btn" data-element="insertImage" onClick={() => handleButtonClick("insertImage")}>
                    <FontAwesomeIcon icon={faImage} />
                  </button>
                  <button type="button" className="btn" data-element="insertCodeBlock" onClick={() => handleButtonClick("insertCodeBlock")}>
                    <FontAwesomeIcon icon={faCode} />
                  </button>
                </div>

                <div ref={editorRef} className="content" contentEditable="true" onInput={() => setQuestionBody(editorRef.current.innerHTML)} onClick={(e) => handleLinkClick(e)}></div>
              </div>

            </label>
            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input
                type="text"
                id="ask-ques-tags"
                onChange={(e) => {
                  setQuestionTags(e.target.value.split(" "));
                }}
                placeholder="e.g. (xml typescript wordpress)"
              />
            </label>
          </div>
          <input
            type="submit"
            value="Reivew your question"
            className="review-btn"
          />
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
