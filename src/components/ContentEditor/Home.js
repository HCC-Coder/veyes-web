import React from 'react';
import { firebase } from '../../firebase';

export default class Home extends React.Component {
  state = {songs: null}

  componentDidMount() {
    firebase.firestore.collection('songs').onSnapshot(snapshot => {
      let songs = [];
      snapshot.forEach(docRef => {
        songs.push({id: docRef.id,...docRef.data()});
      });
      this.setState({songs: songs});
    });
  }

  getList(path) {
    return (new Promise(function(resolve, reject) {
      firebase.firestore.collection(path).get().then((querySnapshot) => {
        let data = [];
        querySnapshot.forEach(doc => {
          data.push({id: doc.id, ...doc.data()})
        });
        resolve(data);
      }).catch(e => {
        reject(e);
      });
    }));
  }

  render() {
    this.getList('songs').then((output) => {
      console.log(output);
    }).catch(e => {
      console.log(e);
    });

    let listOfSongs = [];
    if(this.state.songs) this.state.songs.map((song, i) => {
      listOfSongs.push(
        <div key={i}>
          <a href={song.id}>
            {song.name}
          </a>
        </div>
        );
    });

    return (
      <div>
        <h1>Home</h1>
        {listOfSongs}
      </div>
    );
  }
}