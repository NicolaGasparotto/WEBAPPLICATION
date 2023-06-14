const APIURL = "http://localhost:3000/api";

async function pageList() {
  try {
    const response = await fetch(APIURL + "/pages");
    if (response.ok) {
      const pages = await response.json();
      return pages;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

async function deletePage(pageId) {
  try {
    const response = await fetch(APIURL + `/pages/${pageId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

async function addNewPage(page) {
  try {
    const response = await fetch(APIURL + "/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (err) {
    throw new Error("Network error: " + err.message);
  }
}

async function getContents(pageId) {
  try {
    const response = await fetch(APIURL + `/contents/${pageId}`);
    if (response.ok) {
      const contents = await response.json();
      return contents;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

async function editPage(pageId, page) {
  try {
    const response = await fetch(APIURL + `/pages/${pageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (err) {
    throw new Error("Network error: " + err.message);
  }
}

async function getBlogName() {
  try {
    const response = await fetch(APIURL + "/blogname");
    if (response.ok) {
      const name = await response.json();
      return name;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

async function editBlogName(newName) {
  try {
    const response = await fetch(APIURL + "/blogname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
    if (response.ok) {
      return true;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (err) {
    throw new Error("Network error: " + err.message);
  }
}

async function getAvailableImages() {
  try {
    const response = await fetch(APIURL + "/images");
    if (response.ok) {
      const images = await response.json();
      const imagesList = [];
      let newId = 0;
      images.forEach((image) => {
        imagesList.push({
          id: newId++,
          filename: image,
          name: `Image ${newId}`,
        });
      });
      return imagesList;
    } else {
      const message = await response.text();
      throw new Error("Application error: " + message);
    }
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

async function checkLogin(username, password) {
  try {
    const response = await fetch(APIURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const message = await response.text();
      throw new Error(response.statusText + " " + message);
    }
  } catch (error) {
    throw new Error(error.message, { cause: error });
  }
}

/**
 * This function destroy the current user's session and execute the log-out.
 */
async function doLogout() {
  try {
      const response = await fetch(APIURL + '/logout', {
          method: 'POST',
      });
      if (response.ok) {
          return true ;
      } else {
          const message = await response.text();
          throw new Error(response.statusText + " " + message);
      }
  } catch (error) {
      throw new Error(error.message, { cause: error });
  }
}

export {
  pageList,
  deletePage,
  addNewPage,
  getContents,
  editPage,
  getBlogName,
  editBlogName,
  getAvailableImages,
  checkLogin,
  doLogout
};
