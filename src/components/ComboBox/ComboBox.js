import React from "react";
import classes from "./ComboBox.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import * as urls from "../web";

class ComboBox extends React.Component {
  state = {
    contests: []
  };
   purl = urls.default.purl;

  getContestList = () => {
    let str;
    try {
      str = window.location.href.split("=")[1].split("&")[0];
    } catch {
      console.log("Catch");
      window.location.href = `${this.purl}`;
    }

    axios({
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      url: `${this.purl}?code=${str}`
    })
      .then(res => {
        // console.log("--------->", res);
        return JSON.parse(JSON.stringify(res));
      })
      .then(res => {
        let tk = res.data.access_token;
        let rtk = res.data.refresh_token;
        console.log(tk);
        localStorage.setItem("aut_token", tk);
        localStorage.setItem("ref_token", rtk);

        axios({
          method: "get",
          url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${tk}`
            // Authorization: `Bearer `
          }
        })
          .then(res => {
            res = res.data.result.data.content.contestList;
            this.setState({ contests: res });
          })
          .catch(err => {
            console.log("NOT DONE");
            console.log(err.response);
          });
      })
      .catch(err => {
        console.log("ERROR");
        console.log(err);
        if (localStorage.getItem("ref_token") === null) {
          window.location.href = `${this.purl}`;
        } else {
          fetch(
            `${this.purl}?ref_token=${localStorage.getItem(
              "ref_token"
            )}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
              },
              method: "GET"
            }
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              var tk = res.access_token;
              var rtk = res.refresh_token;
              localStorage.setItem("aut_token", tk);
              localStorage.setItem("ref_token", rtk);
              this.getContestList();
            });
        }
      });
  };

  componentDidMount() {
    this.getContestList();
  }

  render() {
  
    return (
      <div className={classes.ComboBoxPage}>
        <header>
          <div className={classes.header}>
            <img
              className={classes.himage}
              src={require("../assets/finalLogo.jpeg")}
              alt="CodeChef"
            />
          </div>
        </header>
        <img src={require("../assets/wp1828902.png")} alt="" />
        <p className={classes.heading}>COMPETE</p>
        <div className={classes.ComboBox}>
          <Autocomplete
            id="combo-box-demo"
            options={this.state.contests}
            getOptionLabel={option => `${option.code} - ${option.name}`}
            onChange={(a, b, c) =>
              this.props.history.push(`/contest/${b.code}`)
            }
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="All Contests" variant="outlined" />
            )}
          />
        </div>
      </div>
    );
  }
}

export default ComboBox;
