interface Zutat {
  name: string;
  unit: 'St.' | 'ml' | 'g.' | 'kg.';
}

// -------------------

class ZutatenService {

  private _zutaten: Zutat[] = [];

  get zutaten(): Zutat[] {
    return this._zutaten;
  }

  loadZutaten(): Promise<Zutat[]> {
    return fetch('zutaten.json')
      .then(response => response.json() as Promise<Zutat[]>)
      .then(data => {
        this._zutaten = data;
        return data;
      });
  }

  addZutat(zutat: Zutat): void {
    this._zutaten.push(zutat);
  }

}

// -------------------

class EingabeComponent {

  private zutatenCounter = 1;

  constructor(
    private readonly zutatenService: ZutatenService
  ) {
  }

  init() {
    this.initAddZutatButton();
    this.addZutatenInput();
    this.initAddZutatenFormButton();
    this.displayZutaten();
  }

  private initAddZutatenFormButton() {
    document
      .querySelector<HTMLLinkElement>('#add-zutaten-link')
      .addEventListener('click', () => {
        this.addZutatenInput();
      });
  }

  private initAddZutatButton() {
    document
      .querySelector<HTMLButtonElement>('#myButton')
      .addEventListener('click', () => {
        this.zutatenService
          .addZutat({
            name: 'XYZ',
            unit: 'kg.'
          });
        this.displayZutaten();
      });

  }

  displayZutaten(): void {
    document
      .querySelectorAll<HTMLSelectElement>('.zutaten-auswahl')
      .forEach(combobox => {
        combobox.innerHTML = this
          .zutatenService
          .zutaten
          .map(zutat => `<option>${zutat.name} (${zutat.unit})</option>`)
          .join()
      });
  }

  private addZutatenInput(): void {
    document
      .querySelector<HTMLDivElement>('#zutatenInputs')
      .insertAdjacentHTML('beforeend', `
        <div class="form-row">
            <label for="zutat${this.zutatenCounter}">Zutat #${this.zutatenCounter}</label>
            <select class="zutaten-auswahl" name="zutat${this.zutatenCounter}">
            </select>
            <input name="menge1" id="zutat${this.zutatenCounter}" type="number" min="1">
        </div>
      `);
    this.zutatenCounter++;
    this.displayZutaten(); // TODO: nur die neue SELECT befüllen, nicht ALLE
  }

}

// -------------------

const zutatenService = new ZutatenService();
const component = new EingabeComponent(zutatenService);
component.init();
zutatenService
  .loadZutaten()
  .then(() => component.displayZutaten());
