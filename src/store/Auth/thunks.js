import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirestoreDB } from "../../firebase/config"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { fileUpload } from "../../Helpers/fileUpload"
import { loadNotes } from "../../Helpers/loadNotes"
import {  addNewEmptyNote, clearNotesLogout, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosInActive, setSaving, updateNote } from "../Journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAutentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = ( )  =>{
    return async( dispatch ) => {
        dispatch( checkingCredentials() )

        const result = await signInWithGoogle()
        if( !result.ok) return dispatch( logout( result.errorMessage ) )
        
        dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials )
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if(!ok) return dispatch( logout({ errorMessage }) )
        
        dispatch(login({ uid, displayName, email, photoURL }))
    }
}   

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async(dispatch) => {
        dispatch( checkingCredentials )
        const { ok, uid, photoURL, errorMessage,displayName } = await loginWithEmailPassword({ email, password })

        if(!ok) return dispatch( logout({ errorMessage }) )

        dispatch(login({ uid, displayName, photoURL, email}))

    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase()

        dispatch(logout())
        dispatch(clearNotesLogout())
    }
}

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch(savingNewNote())

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirestoreDB, `${ uid }/journal/notes` ) )
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))

        dispatch(setActiveNote(newNote))

    }
} 

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth
        const notes = await loadNotes( uid )
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving())
        
        const { uid } = getState().auth
        const { active:note } = getState().journal

        const newNote = {...note}
        delete newNote.id

        const docRef = doc(FirestoreDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, newNote, { merge: true })

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async(dispatch) => {

        dispatch(setSaving())

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrl = await Promise.all( fileUploadPromises )

        dispatch(setPhotosInActive(photosUrl))
    }
}

export const startDeletingNotes = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth
        const { active:note } = getState().journal

        const docRef = doc(FirestoreDB, `${ uid }/journal/notes/${ note.id }`)
        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))

    }
}