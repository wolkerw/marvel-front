import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      heroes: []
    };
  }

  showHeroStories = heroId => {
    let headers = {
      "Content-Type": "application/graphql",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "*",
      "Access-Control-Allow-Header": "*"
    };

    axios
      .get(
        "http://localhost:8080/heroes/stories?characterId=" + heroId,
        {},
        { headers: headers }
      )
      .then(res => {
        if (res && res.data && res.data.data && res.data.data.results) {
          this.setState({ stories: res.data.data.results });
        } else alert("História não encontrada");
      });
  };

  searchHero = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (!formData.get("characterName")) return alert("Digite o nome do herói!");

    let headers = {
      "Content-Type": "application/graphql",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "*",
      "Access-Control-Allow-Header": "*"
    };

    axios
      .get(
        "http://localhost:8080/hero/id?characterName=" +
          formData.get("characterName"),
        {},
        { headers: headers }
      )
      .then(res => {
        if (
          res &&
          res.data &&
          res.data.data &&
          res.data.data.results &&
          res.data.data.results[0] &&
          res.data.data.results[0].id &&
          res.data.data.results[0].name
        ) {
          this.setState(
            {
              heroes: [
                ...this.state.heroes,
                {
                  id: res.data.data.results[0].id,
                  name: res.data.data.results[0].name
                }
              ]
            },
            () => {
              console.log(this.state.heroes);
            }
          );

          console.log(res.data.data.results[0]);
        } else alert("Herói não encontrado!");
      });
  };

  render() {
    return (
      <div>
        <h3 className="mt-3">
          <br />
          Selecione o herói que deseja ver histórias:
          <br />
          <br />
        </h3>
        <div>
          <form onSubmit={this.searchHero}>
            <label>
              Hero Name (Ex.: Iron Man)
              <input type="text" name="characterName" />
            </label>
            <input type="submit" value="Buscar" />
          </form>
        </div>
        {this.state.stories.length ? (
          <div>
            <b>Histórias:</b>
            {this.state.stories.map(story => (
              <p>{story.title}</p>
            ))}
          </div>
        ) : null}

        {this.state.heroes.length ? (
          <div>
            <b>Heróis:</b>
            {this.state.heroes.map(hero => (
              <div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => this.showHeroStories(hero.id)}
                >
                  {hero.name}
                </button>
                <br />
                <br />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Home);
