import React from 'react';
import { SongForm } from './CreateSongPage'
import { firebase } from '../../firebase';
let db = firebase.firestore;

export default class CreateSongPage extends React.Component {
  state = {
    songs: null,
    name: "",
    artist: "",
    album: "",
    lang: "",
    lyrics: "",
    arrangements: ""
  }

  componentDidMount = () => {
    let song_id = this.props.match.params.id;
    db.collection('songs').doc(song_id).get().then(docRef => {
      let song = docRef.data();
      for(let key in song) {  
        this.setState({[key]: song[key]});
      }
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();
    let song_id = this.props.match.params.id;
    let { name, artist, album, lang, lyrics, arrangements } = this.state;
    db.collection('songs').doc(song_id).set({
      name: name,
      artist: artist,
      album: album,
      lang: lang,
      lyrics: lyrics,
      arrangements: arrangements
    }).catch((e) => {
      console.log(e);
    }).then((docRef) => {
      alert('Successfully Update');
    });
  }

  render() {
    return (
      <div>
        <SongForm onChange={this.onChange} submit={this.submit} state={this.state}/>
      </div>
    );
  }
}