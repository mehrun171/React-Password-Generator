import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const numbers = '0123456789'
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const specialCharacters = "!'%&/_#|`*-@"
 
function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(6)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      toast.error('You must Select atleast one option', {position: "top-center"});
      return "";
    }
    if(passwordLength<4){
      toast.error('Password must be atleast 4 characters long',{position:"top-center"});
      return "";
    }
    let characterList = '';
    if (includeLowercase) {
      characterList = characterList + lowerCase;
    }
    if (includeUppercase) {
      characterList = characterList + upperCase;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }
    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    toast.success("PASSWORD GENERATED",{position:'top-center'});
    return password;
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      toast.error('Nothing To Copy', {position: "top-center"});
    } else {
      copyToClipboard();
      toast.success('Password successfully copied to clipboard', {position: "top-center"});
    }
  }

  return (
    <>
    <h1 className='header'>Password Generator</h1>
    <div className='App'>
      <ToastContainer/>
      <div className='wrapper'>
        <div className='generator'>
          <div className='generatorpassword'>
            <h2>Password:</h2><h3>{password}</h3>
            <button onClick={handleCopyPassword} className='copy-btn'>
              Copy Password  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
  <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
  <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
</svg>
            </button>
          </div>
          <div className='form-group'>
            <label htmlFor='password-strength'>Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type='number'
              id='password-strength'
              name='password-strength'
              max='30'
              min='4'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='uppercase-letters'>Include Uppercase Letters</label>
            <input
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              type='checkbox'
              id='uppercase-letters'
              name='uppercase-letters'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='lowercase-letters'>Include Lowercase Letters</label>
            <input
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              type='checkbox'
              id='lowercase-letters'
              name='lowercase-letters'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='include-numbers'>Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              type='checkbox'
              id='include-numbers'
              name='include-numbers'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='include-symbols'>Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              type='checkbox'
              id='include-symbols'
              name='include-symbols'
            />
          </div>
          <button onClick={handleGeneratePassword} className='grlogbutton'>
            Generate Password
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
export default App
