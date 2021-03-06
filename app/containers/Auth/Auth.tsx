import * as React from "react";
import i18n from "i18next";
import { Redirect } from "react-router-dom";
import { userLoginInterface } from "./constants";
import Login from "../../components/Login";
import "./style.scss";
import { AuthFieldsInterface, UserInterface } from "./interfaces";
import { getValueFromFields } from "./auth-logic";

interface AuthProps {
  onLogin: (payload: userLoginInterface) => void;
  loading: boolean;
  error: string | boolean;
  currentUser: UserInterface | boolean;
}

interface AuthState {
  fields: AuthFieldsInterface;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        {
          type: "login",
          label: i18n.t("Login"),
          value: "",
          disabled: false,
          error: null
        },
        {
          type: "password",
          label: i18n.t("Password"),
          value: "",
          disabled: false,
          error: null
        }
      ]
    };
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fields } = this.state;
    const payload = {
      username: getValueFromFields(fields, "login"),
      password: getValueFromFields(fields, "password")
    };

    this.props.onLogin(payload);
  };

  handleUserInput = (fieldName: string, value: string) => {
    const updatedFields = this.updateFields(
      fieldName,
      value,
      this.state.fields
    );

    this.setState({ fields: updatedFields });
  };

  updateFields = (
    fieldName: string,
    value: string,
    fields: AuthFieldsInterface
  ) => {
    return fields.map(field => {
      if (field.type === fieldName) {
        field.value = value;
        return field;
      }
      return field;
    });
  };

  render() {
    const { fields } = this.state;
    const { loading, error, currentUser } = this.props;

    if (currentUser) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className={"container"}>
        <Login
          fields={fields}
          isLoading={loading}
          error={error}
          onUserInput={this.handleUserInput}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default Auth;
