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

  render() {
    let listOfSongs = [];
    if(this.state.songs) this.state.songs.map((song, i) => {
      listOfSongs.push(
        <div>
          <a key={i} href={song.id}>
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