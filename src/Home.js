import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: []
    };
  }

  showHeroStories = hero => {
    let characterId;
    switch (hero) {
      case "Captain America":
        characterId = 1009220;
        break;
      case "Black Widow":
        characterId = 1009189;
        break;
      case "Iron Man":
      default:
        characterId = 1009368;
        break;
    }

    let headers = {
      "Content-Type": "application/graphql",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "*",
      "Access-Control-Allow-Header": "*"
    };

    axios
      .get(
        "http://localhost:8080/heroes/stories?characterId=" + characterId,
        {},
        { headers: headers }
      )
      .then(res => {
        console.log("res.data.data.results", res.data.data.results);

        if (res && res.data && res.data.data && res.data.data.results) {
          this.setState({ stories: res.data.data.results });

          //this.props.history.push(`/votar`);
        } else alert("História não encontrada");
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
        {this.state.stories.length ? (
          <div>
            <b>Histórias:</b>
            {this.state.stories.map(story => (
              <p>{story.title}</p>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn-dark"
          onClick={() => this.showHeroStories("Iron Man")}
        >
          Homem de Ferro
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => this.showHeroStories("Black Widow")}
        >
          Viúva Negra
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => this.showHeroStories("Captain America")}
        >
          Capitão América
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
