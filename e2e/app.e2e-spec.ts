import { ClientapplicationPage } from './app.po';

describe('clientapplication App', function() {
  let page: ClientapplicationPage;

  beforeEach(() => {
    page = new ClientapplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
