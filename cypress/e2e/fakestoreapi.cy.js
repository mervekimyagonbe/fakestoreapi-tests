describe("FakeStoreAPI Test Suite", () => {

  const baseUrl = "https://fakestoreapi.com";

  it("TC01 - Get all products", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/products`,
      headers: { "User-Agent": "MerveTestAgent" }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"])
  .to.include("application/json");
      expect(response.duration).to.be.lessThan(1500);

      expect(response.body).to.be.an("array");
      expect(response.body[0]).to.include.keys(
        "id", "title", "price", "description", "category", "image"
      );
    });
  });

  
  it("TC02 - Get a single product by random ID", () => {
    const randomId = Math.floor(Math.random() * 20) + 1;

    cy.request(`${baseUrl}/products/${randomId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id", randomId);
      expect(response.body).to.have.property("title");
      expect(response.duration).to.be.lessThan(1500);
    });
  });

 
  it("TC03 - Create product", () => {
    cy.request({
      method: "POST", //veri ekleme
      url: `${baseUrl}/products`,
      headers: { "Content-Type": "application/json" },
      body: {
        title: "Merve Test Product",
        price: 15.5,
        description: "Test Ürünü",
        category: "electronic",
        image: "https://example.com/test.jpg"
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("title", "Merve Test Product");
    });
  });

  
  it("TC04 - Update product", () => {
    cy.request({
      method: "PUT", //güncelleme,veri değiştirme
      url: `${baseUrl}/products/1`,
      body: {
        title: "Updated Product",
        price: 20.0,
        description: "Updated",
        category: "updated-category",
        image: "https://example.com/updated.jpg"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.title).to.eq("Updated Product");
    });
  });


  it("TC05 - Delete product", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/products/1`,
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  
  it("TC06 - Get all carts", () => {
    cy.request(`${baseUrl}/carts`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  
  it("TC07 - Create new cart", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/carts`,
      body: {
        userId: 1,
        products: [{ productId: 1, quantity: 2 }]
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("userId", 1);
    });
  });

 
  it("TC08 - Get cart by ID", () => {
    cy.request(`${baseUrl}/carts/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("id", 1);
    });
  });

  
  it("TC09 - Update cart", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/carts/1`,
      body: {
        userId: 1,
        products: [{ productId: 1, quantity: 5 }]
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.products[0].quantity).to.eq(5);
    });
  });


  it("TC10 - Delete cart", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/carts/1`,
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

 
  it("TC11 - Get all users", () => {
    cy.request(`${baseUrl}/users`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.include.keys("id", "username", "email", "password");
    });
  });


  it("TC12 - Create user", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/users`,
      body: {
        username: "merveUser",
        email: "merve@example.com",
        password: "123456"
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("id");
    });
  });

  
  it("TC13 - Get user by ID", () => {
    cy.request(`${baseUrl}/users/1`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("id");
    });
  });

  
  it("TC14 - Update user", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/users/1`,
      body: {
        username: "updatedName",
        email: "new@example.com",
        password: "111111"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.username).to.eq("updatedName");
    });
  });


  it("TC15 - Delete user", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/users/1`
    }).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

 
  it("TC16 - Login (auth)", () => {
    cy.request({
      method: "POST",
      url: `${baseUrl}/auth/login`,
      body: {
        username: "mor_2314",
        password: "83r5^_"
      }
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("token");
    });
  });

  it("TC17 - Get products with query params", () => {
  const randomLimit = Math.floor(Math.random() * 5) + 1;

  cy.request({
    method: "GET",
    url: `${baseUrl}/products`,
    qs: {
      limit: randomLimit
    },
    headers: {
      "User-Agent": "MerveTestAgent"
    }
  }).then((res) => {
    expect(res.status).to.eq(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.at.most(randomLimit);
    expect(res.duration).to.be.lessThan(1500);
  });
});


});
