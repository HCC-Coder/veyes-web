import React from 'react';
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
    arrangements: "",
    albums: [],
    artists: []
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  submit = (e) => {
    e.preventDefault();
    let { name, artist, album, lang, lyrics, arrangements } = this.state;
    db.collection('songs').add({
      name: name,
      artist: artist,
      album: album,
      lang: lang,
      lyrics: lyrics,
      arrangements: arrangements
    }).catch((e) => {
      console.log(e);
    }).then((docRef) => {
      // Process lyrics
      // Loop through
      db.collection('songs').doc(docRef.id).collection('lyrics').add({
        // content to be save
      });
      // this.props.history.push(docRef.id);
      alert('Created successfully!');
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

class SongForm extends React.Component {
  
  state = {
    albums: [],
    artists: []
  }

  componentDidMount = () => {
    let albums = [];
    let artists = [];
    db.collection('albums').get().then(snapshot => {
      snapshot.forEach((docRef) => {
        albums.push({value: docRef.id, name: docRef.data().name});
        this.setState({albums: albums});
      });
    });
    db.collection('artists').get().then(snapshot => {
      snapshot.forEach((docRef) => {
        artists.push({value: docRef.id, name: docRef.data().name});
        this.setState({artists: artists});
      });
    });
  }

  render() {
    let { albums, artists } = this.state;
    let albums_choice = [];
    let artists_choice = [];
    albums.map((album, i) => {
      albums_choice.push(<option key={i} value={album.value}>{album.name}</option>);
    });
    artists.map((artist, i) => {
      artists_choice.push(<option key={i} value={artist.value}>{artist.name}</option>);
    });

    return (
      <form onSubmit={this.props.submit}>
        Name: <input type="text" name="name" onChange={this.props.onChange} value={this.props.state.name}/>
        <br/>
        Album: <select name="album" onChange={this.props.onChange} value={this.props.state.album}>
          <option value="">Select an album</option>
          {albums_choice}
        </select>
        <br/>
        Artist: <select name="artist" onChange={this.props.onChange} value={this.props.state.artist}>
          <option value="">Select an artist</option>
          {artists_choice}
        </select>
        <br/>
        Language: <input type="text" name="lang" onChange={this.props.onChange} value={this.props.state.lang}/>
        <br/>
        Lyrics: <textarea name="lyrics" onChange={this.props.onChange} value={this.props.state.lyrics}/>
        <br/>
        Arrangement: <textarea name="arrangements" onChange={this.props.onChange} value={this.props.state.arrangements}/>
        <br/>
        <button>
        Submit
        </button>
      </form>
    );
  }
}

export {
  SongForm
}