// utils/Api.js

export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async postCardInfo({ link, name}) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link,
        name
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }


  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async editUserInfo({ name, about }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

  async editUserAvatar ({ avatar}) {
    const res = await fetch (`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }

}
