import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "@/firebaseConfig";
import { FIREBASE } from "@/api";
import router from "@/router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    userPhoto: null,
    userSession: false,
    errCode: "",
    errMsg: "",
  }),

  actions: {
    async registerUser(email, password, displayName) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const user = data.user;
          updateProfile(auth.currentUser, {
            displayName: displayName,
          }).then(() => {
            this.userData = {
              uid: user.uid,
              email: user.email,
              password: user.password,
              displayName: user.displayName,
            };
          });
          this.userPhoto = null;
          this.errCode = '';
          this.userSession = true;
          router.push("/");
        })
        .catch((error) => {
          this.errCode = error;
        });
    },

    async loginUser(email, password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const user = data.user;
          this.userData = {
            email: user.email,
            uid: user.uid,
          };
          this.errCode = '';
          this.userSession = true;
          router.push("/");
        })
        .catch((error) => {
          this.errCode = error;
        });
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/auth");
        this.userSession = false;
      } catch (error) {
        console.log(error);
      }
    },

    async currentUser() {
      return new Promise((resolve, reject) => {
        const current = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
              };
              this.userSession = true;
            } else {
              this.userData = null;
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        current();
      });
    },

    async getProfileImage() {
      if (this.userData) {
        await FIREBASE.get(
          `/users/${this.userData.uid}/profile/photo.json`
        ).then((photo) => {
          if (this.userPhoto !== photo.data) {
            return (this.userPhoto = photo.data);
          }
        });
      }
    },

    async editUserProfile(photoUser, nameProfile) {
      if (photoUser != null) {
        const database = getDatabase();
        await set(ref(database, "/users/" + this.userData.uid + "/profile"), {
          photo: photoUser,
        });
        await this.getProfileImage();
      }
      await this.updateProfileUser(nameProfile);
    },

    async updateProfileUser(displayName) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      this.userData.displayName = displayName;
    },
  },
});
