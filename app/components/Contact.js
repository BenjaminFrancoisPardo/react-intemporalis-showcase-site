import React, { useContext, useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';
import validator from 'validator';
import Axios from 'axios';

//Components
import Page from './Page';
import Container from './Container';
import DispatchContext from '../DispatchContext';

function Contact() {
  const appDispatch = useContext(DispatchContext);
  const dropArea = document.querySelector('.drop-area');
  const fileInput = document.getElementById('file-input');
  const body = document.body;
  const loadingScreen = document.querySelector('.loader-wrapper');
  const maxTotalFileSize = 15000000;

  const [fileList, setFileList] = useState([]);
  const [totalFileSize, setTotalFileSize] = useState(0);
  const [isLoadedFinished, setIsLoadedFinished] = useState(false);

  const initialState = {
    surname: {
      value: '',
      hasErrors: false,
      message: '',
    },
    name: {
      value: '',
      hasErrors: false,
      message: '',
    },
    company: {
      value: '',
    },
    phone: {
      value: '',
      hasErrors: false,
      message: '',
    },
    email: {
      value: '',
      hasErrors: false,
      message: '',
    },
    object: {
      value: '',
      hasErrors: false,
      message: '',
    },
    message: {
      value: '',
      hasErrors: false,
      message: '',
    },
    isJustSubmitted: false,
  };
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'surnameImmediatly':
        draft.surname.hasErrors = false;
        draft.surname.value = action.value;
        if (draft.surname.value == '') {
          draft.surname.hasErrors = true;
          draft.surname.message = 'Ce champ est requis.';
        }
        if (
          draft.surname.value != '' &&
          !validator.isAlpha(draft.surname.value, 'fr-FR', { ignore: ' -' })
        ) {
          draft.surname.hasErrors = true;
          draft.surname.message =
            "Ce champ n'accepte que des lettres, tirets et espaces.";
        }
        return;
      case 'surnameOnBlur':
        if (draft.surname.value == '') {
          draft.surname.hasErrors = true;
          draft.surname.message = 'Ce champ est requis.';
        }
        return;
      case 'nameImmediatly':
        draft.name.hasErrors = false;
        draft.name.value = action.value;
        if (draft.name.value == '') {
          draft.name.hasErrors = true;
          draft.name.message = 'Ce champ est requis.';
        }
        if (
          draft.name.value != '' &&
          !validator.isAlpha(draft.name.value, 'fr-FR', { ignore: ' -' })
        ) {
          draft.name.hasErrors = true;
          draft.name.message =
            "Ce champ n'accepte que des lettres, tirets et espaces.";
        }
        return;
      case 'nameOnBlur':
        if (draft.name.value == '') {
          draft.name.hasErrors = true;
          draft.name.message = 'Ce champ est requis.';
        }
        return;
      case 'companyImmediatly':
        draft.company.value = action.value;
        return;
      case 'phoneImmediatly':
        draft.phone.hasErrors = false;
        draft.phone.value = action.value;
        return;
      case 'phoneAfterDelay':
        if (!validator.isMobilePhone(draft.phone.value)) {
          draft.phone.hasErrors = true;
          draft.phone.message = "Ce format de numéro n'est pas valide.";
        }
        return;
      case 'phoneOnBlur':
        if (draft.phone.value == '') {
          draft.phone.hasErrors = true;
          draft.phone.message = 'Ce champ est requis.';
        }
        return;
      case 'emailImmediatly':
        draft.email.hasErrors = false;
        draft.email.value = action.value;
        return;
      case 'emailAfterDelay':
        if (!validator.isEmail(draft.email.value)) {
          draft.email.hasErrors = true;
          draft.email.message = 'Ce champ nécessite une adresse email.';
        }
        return;
      case 'emailOnBlur':
        if (draft.email.value == '') {
          draft.email.hasErrors = true;
          draft.email.message = 'Ce champ est requis.';
        }
        return;
      case 'objectImmediatly':
        draft.object.hasErrors = false;
        draft.object.value = action.value;
        return;
      case 'objectOnBlur':
        if (draft.object.value == '') {
          draft.object.hasErrors = true;
          draft.object.message = 'Ce champ est requis.';
        }
        return;
      case 'messageImmediatly':
        draft.message.hasErrors = false;
        draft.message.value = action.value;
        return;
      case 'messageOnBlur':
        if (draft.message.value == '') {
          draft.message.hasErrors = true;
          draft.message.message = 'Ce champ est requis.';
        }
        return;
      case 'emptyFields':
        draft.surname.value = '';
        draft.name.value = '';
        draft.company.value = '';
        draft.phone.value = '';
        draft.email.value = '';
        draft.object.value = '';
        draft.message.value = '';
        return;
      case 'justSubmitted':
        draft.isJustSubmitted = true;
        return;
      case 'removeJustSubmitted':
        draft.isJustSubmitted = false;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.isJustSubmitted == true) {
      setTimeout(() => {
        dispatch({ type: 'removeJustSubmitted' });
      }, 5000);
    }
  }, [state.isJustSubmitted]);

  useEffect(() => {
    if (state.phone.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'phoneAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.phone.value]);

  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(
        () => dispatch({ type: 'emailAfterDelay' }),
        800
      );
      return () => clearTimeout(delay);
    }
  }, [state.email.value]);

  useEffect(() => {
    const url = window.location.pathname;
    appDispatch({ type: 'updateURL', url });
  }, []);

  useEffect(() => {
    if (loadingScreen && isLoadedFinished) {
      enableScreen();
      setIsLoadedFinished(false);
    }
  });

  useEffect(() => {
    if (fileList.length > 0) {
      if (dropArea.classList.contains('active')) {
        dropArea.classList.remove('active');
      }
    }
  }, [fileList]);

  const onDragOverHandler = (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
  };

  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    dropArea.classList.remove('active');
  };

  const onDropHandler = (e) => {
    e.preventDefault(); //prevent default behaviour
    addFiles(e.dataTransfer.files);
  };

  const fileValidation = (files) => {
    const allowedFileTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/pdf',
    ];
    let newTotalFileSize = totalFileSize;
    let filesValid = true;
    files.forEach((file) => {
      newTotalFileSize = newTotalFileSize + file.size;
      if (!allowedFileTypes.includes(file.type)) {
        alert(
          'Seuls les formats suivants sont acceptés : jpg, jpeg, png, pdf.'
        );
        filesValid = false;
      }
    });
    if (newTotalFileSize > maxTotalFileSize) {
      alert('The total size of your attachments cannot exceed 15 Mo.');
      filesValid = false;
    }
    if (filesValid) {
      setTotalFileSize(newTotalFileSize);
    }
    return filesValid;
  };

  const addFiles = (files) => {
    const filesRaw = files; //accessing object of uploaded files
    const filesRawArray = Object.values(filesRaw); //object to array
    let counter = 0;
    if (fileValidation(filesRawArray)) {
      //disable screen
      disableScreen();
      filesRawArray.forEach((file, index, array) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const fileURL = fileReader.result;
          const cleanFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            url: fileURL,
          };
          // add file to fileList temp array
          let cleanFilesArray = fileList;
          cleanFilesArray.push(cleanFile);
          //remove duplicates
          cleanFilesArray = cleanFilesArray.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.place === value.place && t.name === value.name
              )
          );
          if (cleanFilesArray !== fileList) {
            setFileList(cleanFilesArray);
          }
          counter = counter + 1;
          if (counter == array.length) {
            setIsLoadedFinished(true);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (e) => {
    e.preventDefault();
    const itemToDelete = e.target.parentElement.id;
    let newFileList = fileList;
    let newTotalFileSize;
    newFileList = newFileList.filter((file) => {
      const isIdentical = file.name === itemToDelete;
      if (isIdentical) {
        newTotalFileSize = totalFileSize - file.size;
      }
      return !isIdentical;
    });
    setTotalFileSize(newTotalFileSize);
    setFileList(newFileList);
  };

  const browseClickHandler = (e) => {
    e.preventDefault();
    dropArea.classList.add('active');
    fileInput.click();
  };

  const inputChangeHandler = (e) => {
    addFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !state.surname.hasErrors &&
      !state.name.hasErrors &&
      !state.phone.hasErrors &&
      !state.email.hasErrors &&
      !state.object.hasErrors &&
      !state.message.hasErrors
    ) {
      const msg = Object.assign({}, state, { attachments: fileList });
      try {
        await Axios.post('/api/sendMail', {
          surname: state.surname.value.trim(),
          name: state.name.value.trim(),
          company: state.company.value.trim(),
          email: state.email.value,
          phone: state.phone.value,
          object: state.object.value.trim(),
          message: state.message.value.trim(),
          attachments: fileList,
        });
        console.info('Mail successfully sent.');
        dispatch({ type: 'emptyFields' });
        setFileList([]);
        setTotalFileSize(0);
        dispatch({ type: 'justSubmitted' });
      } catch (e) {
        console.error(e.response);
        //alert("Un problème est survenu et votre message n'a pas été envoyé.");

        alert(
          'This form is for demonstration purpose only and no longer sends emails since bpardo@intemporalis is not a valid email anymore. Sorry for the inconvenience.'
        );
      }
    } else {
      alert(
        "Au moins un des champs du formulaire n'est pas correctement rempli."
      );
    }
  };

  const disableScreen = () => {
    body.style.overflow = 'hidden';
    const scrollValue = window.scrollY;
    loadingScreen.style.top = `${scrollValue}px`;
    loadingScreen.classList.add('active');
  };

  const enableScreen = () => {
    body.style.overflow = 'visible';
    loadingScreen.classList.remove('active');
  };

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 octets';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <Page title="Contact">
      <Container>
        <div className="contact__info">
          <a href="tel:+33671842273">06 71 84 22 73</a>
          <a href="mailto:bpardo@intemporalis.fr">bpardo@intemporalis.fr</a>
          <img src="../assets/infinity.svg" alt="Symbole infini" />
        </div>
        <p className="contact__paragraph">
          N'hésitez pas à utiliser le formulaire ci-dessous pour me présenter
          votre projet et vos besoins. Ajoutez toutes les ressources nécessaires
          en pièces-jointes.
        </p>
        <form onSubmit={handleSubmit}>
          <CSSTransition
            in={state.surname.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.surname.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="surname">Nom*</label>
            <input
              onBlur={(e) =>
                dispatch({ type: 'surnameOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'surnameImmediatly', value: e.target.value })
              }
              value={state.surname.value}
              name="surname"
              id="surname"
              type="text"
              autoFocus
              required
              className={state.surname.hasErrors ? 'error' : ''}
            />
          </div>

          <CSSTransition
            in={state.name.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.name.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="name">Prénom*</label>
            <input
              onBlur={(e) =>
                dispatch({ type: 'nameOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'nameImmediatly', value: e.target.value })
              }
              value={state.name.value}
              name="name"
              id="name"
              type="text"
              required
              className={state.name.hasErrors ? 'error' : ''}
            />
          </div>

          <div className="form__entry">
            <label htmlFor="company">Entreprise</label>
            <input
              onChange={(e) =>
                dispatch({ type: 'companyImmediatly', value: e.target.value })
              }
              value={state.company.value}
              name="company"
              id="company"
              type="text"
            />
          </div>

          <CSSTransition
            in={state.phone.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.phone.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="phone">Téléphone*</label>
            <input
              onBlur={(e) =>
                dispatch({ type: 'phoneOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'phoneImmediatly', value: e.target.value })
              }
              value={state.phone.value}
              name="phone"
              id="phone"
              type="tel"
              required
              className={state.phone.hasErrors ? 'error' : ''}
            />
          </div>

          <CSSTransition
            in={state.email.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.email.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="email">Email*</label>
            <input
              onBlur={(e) =>
                dispatch({ type: 'emailOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'emailImmediatly', value: e.target.value })
              }
              value={state.email.value}
              name="email"
              id="email"
              type="email"
              required
              className={state.email.hasErrors ? 'error' : ''}
            />
          </div>

          <CSSTransition
            in={state.object.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.object.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="object">Objet*</label>
            <input
              onBlur={(e) =>
                dispatch({ type: 'objectOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'objectImmediatly', value: e.target.value })
              }
              value={state.object.value}
              name="object"
              id="object"
              required
              type="text"
              className={state.object.hasErrors ? 'error' : ''}
            />
          </div>

          <CSSTransition
            in={state.message.hasErrors}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="error-message liveValidateMessage">
              {state.message.message}
            </div>
          </CSSTransition>
          <div className="form__entry">
            <label htmlFor="message">Message*</label>
            <textarea
              onBlur={(e) =>
                dispatch({ type: 'messageOnBlur', value: e.target.value })
              }
              onChange={(e) =>
                dispatch({ type: 'messageImmediatly', value: e.target.value })
              }
              value={state.message.value}
              name="message"
              id="message"
              required
              rows="8"
              className={state.message.hasErrors ? 'error' : ''}
            ></textarea>
          </div>

          <div className="form__entry">
            <label htmlFor="file-input">Pièce(s)-jointe(s)</label>
            <div
              className="drop-area"
              onDragOver={onDragOverHandler}
              onDragLeave={onDragLeaveHandler}
              onDrop={onDropHandler}
            >
              <header>Glisser-déposer</header>
              <span>ou</span>
              <button onClick={browseClickHandler}>Parcourir</button>
              <input
                id="file-input"
                type="file"
                hidden
                name="file-input"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="form-entry">
            <ul className="file-list">
              {fileList.map((file) => {
                return (
                  <li key={file.name} id={file.name}>
                    <a href={file.url} target="_blank">
                      {truncate(file.name, 25)}
                    </a>
                    <button onClick={removeFile}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <small>{formatBytes(totalFileSize)} / 15Mo</small>
          <small>* Champ obligatoire</small>
          <div className="form__submit-wrapper">
            <input className="main-button" type="submit" value="Envoyer" />
            <p>
              Un petit <span className="secondary-clr">click</span> pour vous,
              un grand pas pour votre{' '}
              <span className="secondary-clr">projet</span> !
            </p>
          </div>
          <CSSTransition
            in={state.isJustSubmitted}
            timeout={330}
            classNames="liveValidateMessage"
            unmountOnExit
          >
            <div className="success-message liveValidateMessage">
              Votre message a été envoyé avec succès.
            </div>
          </CSSTransition>
        </form>
      </Container>
      <div className="loader-wrapper">
        <img src="../assets/infinity.svg" alt="Infinity icon" />
      </div>
    </Page>
  );
}

export default Contact;
