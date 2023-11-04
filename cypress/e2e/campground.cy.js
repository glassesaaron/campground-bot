
describe('book a campsite', () => {
  it('passes', () => {
    cy.fixture('data.json').then((data)=>{
      const sites = new Set();
      for(let site of data.sitesArray){
        sites.add(site);
      }

      cy.visit(data.baseUrl);
      cy.get('#campingDate').type(data.startDate);
      cy.get('#lengthOfStay').type(data.lengthOfStay);
      cy.get('#search_avail').click();
      let site = null;
      cy.get('#shoppingitems').find('a').each((x) => {
        if(site === null && sites.has(x.text())){
          site = x.text();
          cy.get('a').contains(site).click();
          cy.get('#btnbookdates').click();
          cy.get('input[title="Enter your user name"]').type(data.email);
          cy.get('input[type="password"]').type(data.password);
          cy.get('button[name="submitForm"]').click();
          cy.pause();
        }
      });
    });
  })
})
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
})
