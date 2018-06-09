import React from 'react';
import { firebase } from '../../firebase';
let db = firebase.firestore;

export default class CreateSongPage extends React.Component {
  state = {
    songs: null,
    name: "",
    artist: "",
    album: "",
    lang: "en|zh",
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
      <div>
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
        <Preview lyrics={this.props.state.lyrics} lang={this.props.state.lang} arrangements={this.props.state.arrangements}/>
      </div>
    );
  }
}

class Preview extends React.Component {
  state = {mode: null}

  linesToArray(text) {
      let result = [];
      while(text.indexOf('\r\n') !== -1) {
          result.push(text.slice(0, text.indexOf('\r\n')));
          text = text.slice(text.indexOf('\r\n') + 2);
      }
      while(text.indexOf('\n') !== -1) {
          result.push(text.slice(0, text.indexOf('\n')));
          text = text.slice(text.indexOf('\n') + 1);
      }
      result.push(text);
      return result;
    }
    separateLang(text) {
      let result = [];
      while(text.indexOf('|') !== -1) {
        result.push(text.slice(0, text.indexOf('|')));
        text = text.slice(text.indexOf('|') + 1);
      }
      result.push(text);
      return result;
    }
    separateLabel(array) {
      let result = [];
      let label;
      array.map(text => {
        let model = {};
        if(text.indexOf('[') !== -1 && text.indexOf(']') !== -1) {
          // is label
          label = text.slice(text.indexOf('[') + 1, text.indexOf(']'));
        } else if (text.indexOf('[') === -1 && text.indexOf(']' === -1)) {
          // is lyric
          model.text = text;
          model.label = label;
          result.push(model);
        }
      });
      return result;
    }
    emptyRemoval(array) {
      let result = [];
      array.map(element => {
        if(element.text !== '')result.push(element);
      });
      return result;
    }
    switchMode(lang) {
      this.setState({mode: lang});
    }
    sortByLabel(array) {
        let result = {};
        let label;
        for(let x in array) {
          if (label != array[x].label)label = array[x].label;
          if(!result[label])result[label] = [];
          result[label].push(array[x].text);
        }
        return result;
      }

    render() {
      let langs = this.separateLang(this.props.lang);
      let buttons = [];
      langs.map((lang, i) => {
        buttons.push(<button key={i} onClick={this.switchMode.bind(this, lang)}>{lang}</button>);
      });

      let processedLyrics = {};
      langs.map(l => {
        processedLyrics[l] = [];
      });
      this.emptyRemoval(
        this.separateLabel(
          this.linesToArray(this.props.lyrics)
        )
      ).map((model, i) => {
        let lyricComponent = {}
        lyricComponent.text = model.text;
        lyricComponent.label = model.label;
        processedLyrics[langs[i % langs.length]].push(lyricComponent);
      });

      let outputByLanguage = [];
      for(let x in processedLyrics){
        let lyrics = [];
        processedLyrics[x].map((output, i) => {
          lyrics.push(<div key={i}>label: {output.label}, text: {output.text}</div>);
        })
        outputByLanguage.push(<div key={x}> {x} <br/> {lyrics} <hr/></div>);
      }
      let outputByLabel = [];
      if(this.state.mode) {
        let list = this.sortByLabel(processedLyrics[this.state.mode]);
        for(let x in list) {
          let lyrics = [];
          list[x].map((text, i) => {
            lyrics.push(<div key={i}>{text}</div>);
          });
          outputByLabel.push(<div key={x}>{x}<br/>{lyrics}</div>);
        }
      }
      return (
        <div style={{display: 'flex'}}>
          <div>
            {outputByLanguage}
          </div>
          <div>
            {buttons}
            {outputByLabel}
          </div>
        </div>
      );
    }
}

export {
  SongForm
}