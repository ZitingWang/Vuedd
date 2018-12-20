import firebase from 'firebase'
import firebaseui from 'firebaseui'

const config = {
  apiKey: 'AIzaSyAGRJwhO5_DKJ4xVq8hXv8tB_OXDjyKwF4',
  authDomain: 'webapp-2ce3f.firebaseapp.com',
  databaseURL: 'https://webapp-2ce3f.firebaseio.com',
  projectId: 'webapp-2ce3f',
  storageBucket: 'webapp-2ce3f.appspot.com',
  messagingSenderId: '996927180848'
}

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init (context) {
    this.context = context

    firebase.initializeApp(config)
    this.uiConfig = {
      signInSuccessUrl: 'dashboard',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if (requireAuth && !user) this.context.$router.push('auth')
      else if (guestOnly && user) this.context.$router.push('dashboard')
    })
  },
  authForm (container) {
    this.ui.start(container, this.uiConfig)
  },
  user () {
    return this.context ? firebase.auth().currentUser : null
  },
  logout () {
    firebase.auth().signOut()
  }
}

export default auth
