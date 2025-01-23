import { MedicRecordTemplatePage } from './app.po';

describe('MedicRecord App', function() {
  let page: MedicRecordTemplatePage;

  beforeEach(() => {
    page = new MedicRecordTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
