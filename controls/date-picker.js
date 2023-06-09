import AvocadoCalendar from "./calendar.js";

export default class AvocadoDatePicker extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        :host( [concealed] ) {
          visibility: hidden;
        }

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          color: #525252;
          cursor: pointer;
          direction: ltr;
          display: flex;
          font-family: 'Material Symbols Outlined';
          font-size: 18px;
          font-style: normal;
          font-weight: normal;
          height: 20px;
          justify-content: center;
          letter-spacing: normal;
          margin: 0;
          min-height: 20px;
          min-width: 20px;
          margin: 0;
          overflow: hidden;
          padding: 0;
          text-transform: none;
          text-rendering: optimizeLegibility;
          transition:
            margin 300ms ease-out,
            min-width 300ms ease-out,
            opacity 300ms ease-out,
            width 300ms ease-out;
          white-space: nowrap;
          width: 20px;          
          word-wrap: normal;
          -webkit-tap-highlight-color: transparent;
        }

        button[part=clear] {
          opacity: 0;
          min-width: 0;
          width: 0;
        }

        button[part=button] {
          margin: 0 12px 0 6px;
        }

        div[part=header] {
          align-items: flex-end;
          display: flex;
          flex-basis: 0;
          flex-direction: row;
          flex-grow: 1;
          margin: 0;
          padding: 0;
        }

        div[part=header] > div {
          align-items: flex-start;
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
        }

        input {
          appearance: none;
          background: none;
          border: none;
          box-sizing: border-box;
          color: #c6c6c6;
          cursor: pointer;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          height: 40px;
          margin: 0;
          min-height: 40px;
          min-width: 0;
          outline: none;
          padding: 0 16px 0 16px;
          text-align: left;
          text-rendering: optimizeLegibility;
          width: 0;
          -webkit-appearance: none;          
          -webkit-tap-highlight-color: transparent;
        }

        input::placeholder {
          color: #a8a8a8;
        }                 

        input.filled {
          color: #161616;
        }

        label {
          align-items: center;
          background-color: #f4f4f4;
          border-bottom: solid 1px #8d8d8d;          
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          flex-basis: 0;
          flex-direction: row;
          flex-grow: 1;
          margin: 0;
          outline: solid 2px transparent;
          outline-offset: -2px;
          padding: 0;
          transition: background-color 150ms ease-in-out;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        label:focus-within {
          outline: solid 2px #0f62fe;
        }

        p {
          box-sizing: border-box;          
          cursor: default;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }

        p.icon {
          color: #da1e28;
          cursor: default;
          direction: ltr;
          font-family: 'Material Symbols Outlined';
          font-size: 18px;
          font-style: normal;
          font-weight: normal;
          height: 20px;
          letter-spacing: normal;
          line-height: 20px;
          opacity: 0;
          overflow: hidden;
          margin: 0;
          min-height: 20px;
          min-width: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
          text-transform: none;
          transition:
            margin 300ms ease-out,
            opacity 300ms ease-out,
            width 300ms ease-out
          white-space: nowrap;
          width: 0;
          word-wrap: normal;
        }

        p[part=error] {
          color: #6f6f6f;
          font-size: 12px;
          padding: 4px 0 0 0;
          visibility: hidden;
        }

        p[part=helper] {
          color: #6f6f6f;
          font-size: 12px;
          padding: 0 0 4px 0;
        }

        p[part=label] {
          color: #525252;
          flex-basis: 0;
          flex-grow: 1;
          font-size: 12px;
          padding: 0;
        }

        ::slotted( adc-label ) {
          margin: 0 0 4px 0;
          --label-color: #6f6f6f;
          --label-font-size: 12px;
        }

        ::slotted( adc-link ) {
          margin: 0 0 2px 0;
          --link-font-size: 12px;
        }

        :host( [editable] ) input {
          color: #161616;
          cursor: pointer;
        }

        :host( [error] ) p[part=error] {
          visibility: visible;
        }

        :host( [invalid] ) p[part=invalid] {
          min-width: 20px;
          opacity: 1.0;
          margin: 0 12px 0 0;
          width: 20px;
        }        

        :host( [invalid] ) label {
          outline: solid 2px #da1e28;
        }

        :host( [invalid] ) p[part=error] {
          color: #da1e28;
        }

        :host( [invalid] ) p.icon {
          min-width: 20px;
          opacity: 1.0;
          margin: 0 6px 0 0;
          width: 20px;
        }

        :host( [light] ) label {
          background-color: #ffffff;
        }

        :host( [value]:not( [read-only] ) ) label:focus-within p.icon {
          margin: 0 6px 0 0;
        }

        :host( [value]:not( [read-only] ) ) label:focus-within button[part=clear] {
          min-width: 20px;
          opacity: 1.0;
          margin: 0 12px 0 0;
          width: 20px;
        }

        :host( [read-only] ) button[part=button],
        :host( [read-only] ) button[part=clear] {
          min-width: 0;
          opacity: 0;
          margin: 0;
          width: 0;                    
        }

        :host( [read-only] ) input {
          cursor: default;
        }        

        :host( [read-only] ) label {
          border-bottom: solid 1px transparent;
          cursor: default;
        }        

        :host( [read-only] ) label:hover {
          background-color: #f4f4f4;
        }                
        
        :host( [read-only][light] ) label:hover {
          background-color: #ffffff;
        }                        

        :host( [read-only] ) label:focus-within {        
          outline: solid 2px transparent;
        }        
      </style>
      <div part="header">
        <div>
          <p class="text" part="label"></p>
          <p class="text" part="helper"></p>
        </div>
        <slot></slot>
      </div>
      <label part="field">
        <input part="input" type="button" />
        <p class="icon" part="invalid">error</p>
        <button part="clear" type="button">close</button>
        <button part="button" type="button">calendar_month</button>
      </label>
      <p class="text" part="error"></p>
    `;

    // Private
    this._calendar = null;
    this._data = null;
    this._format = null;
    this._touch = ( 'ontouchstart' in document.documentElement ) ? 'touchstart' : 'click';        
    this._value = null;

    // Removable events
    this.doCalendarChange = this.doCalendarChange.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$calendar = this.shadowRoot.querySelector( 'button[part=button]' );
    this.$calendar.addEventListener( this._touch, () => this.doCalendarClick() );    
    this.$error = this.shadowRoot.querySelector( 'p[part=error]' );
    this.$helper = this.shadowRoot.querySelector( 'p[part=helper]' );
    this.$input = this.shadowRoot.querySelector( 'input[part=input]' );
    this.$input.addEventListener( this._touch, () => this.doInputClick() );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
  }

  doCalendarChange( evt ) {
    this._calendar.hide();
    this._calendar.removeEventListener( 'change', this.doCalendarChange );    
    
    this.value = evt.detail;

    this.dispatchEvent( new CustomEvent( 'change', {
      detail: new Date( this.value.getTime() )
    } ) );
  }

  doCalendarClick() {
    if( this._calendar.opened ) {
      this._calendar.hide();
      this._calendar.removeEventListener( 'change', this.doCalendarChange );
    } else {
      this._calendar.addEventListener( 'change', this.doCalendarChange );
      this._calendar.today = true;      
      this._calendar.value = this.value;
      this._calendar.show( this );
    }
  }

  doInputClick() {
    if( this.editable ) return;
    if( this.readOnly ) return;
    this.doCalendarClick();
  }

   // When attributes change
  _render() {
    this.$error.innerText = this.error === null ? '&nbsp;' : this.error;
    this.$helper.innerText = this.helper === null ? '' : this.helper;
    this.$label.innerText = this.label === null ? '' : this.label;

    if( this._value !== null ) {
      if( this.formatFunction === null ) {
        const formatted = new Intl.DateTimeFormat( navigator.language, {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit'
        } ).format( this._value );    
        this.$input.value = formatted;
      } else {
        this.$input.value = this._format( this._value );
      }
      
      this.$input.classList.add( 'filled' );
    } else {
      this.$input.classList.remove( 'filled' );

      if( this.editable ) {
        this.$input.value = null;        
        this.$input.placeholder = this.placeholder;
      } else {
        this.$input.value = this.placeholder === null ? '' : this.placeholder;
      }
    }
  }

  // Promote properties
  // Values may be set before module load
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }

  // Setup
  connectedCallback() {
    this._calendar = document.body.querySelector( 'adc-calendar' );

    if( this._calendar === null ) {
      this._calendar = document.createElement( 'adc-calendar' );
      document.body.appendChild( this._calendar );
    }

    this._upgrade( 'concealed' );
    this._upgrade( 'data' );
    this._upgrade( 'editable' );    
    this._upgrade( 'error' );
    this._upgrade( 'formatFunction' );    
    this._upgrade( 'helper' );
    this._upgrade( 'hidden' );
    this._upgrade( 'invalid' );
    this._upgrade( 'label' );
    this._upgrade( 'light' );
    this._upgrade( 'placeholder' );    
    this._upgrade( 'readOnly' );
    this._upgrade( 'value' );    

    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'editable',
      'error',
      'helper',
      'hidden',
      'invalid',
      'label',
      'light',
      'placeholder',
      'read-only'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
  }

  get formatFunction() {
    return this._format;
  }

  set formatFunction( value ) {
    this._format = value;
  }  

  get value() {
    return this._value;
  }

  set value( date ) {
    if( date === null ) {
      this._value = null;
    } else {
      if( date instanceof Date ) {
        this._value = new Date( date.getTime() );
      } else if( typeof( date ) === 'number' ) {
        this._value = new Date( date );
      }
    }

    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get concealed() {
    return this.hasAttribute( 'concealed' );
  }

  set concealed( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'concealed' );
      } else {
        this.setAttribute( 'concealed', '' );
      }
    } else {
      this.removeAttribute( 'concealed' );
    }
  }

  get editable() {
    return this.hasAttribute( 'editable' );
  }

  set editable( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'editable' );
      } else {
        this.setAttribute( 'editable', '' );
      }
    } else {
      this.removeAttribute( 'editable' );
    }
  }  

  get error() {
    if( this.hasAttribute( 'error' ) ) {
      return this.getAttribute( 'error' );
    }

    return null;
  }

  set error( value ) {
    if( value !== null ) {
      this.setAttribute( 'error', value );
    } else {
      this.removeAttribute( 'error' );
    }
  }

  get helper() {
    if( this.hasAttribute( 'helper' ) ) {
      return this.getAttribute( 'helper' );
    }

    return null;
  }

  set helper( value ) {
    if( value !== null ) {
      this.setAttribute( 'helper', value );
    } else {
      this.removeAttribute( 'helper' );
    }
  }

  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }

  get invalid() {
    return this.hasAttribute( 'invalid' );
  }

  set invalid( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'invalid' );
      } else {
        this.setAttribute( 'invalid', '' );
      }
    } else {
      this.removeAttribute( 'invalid' );
    }
  }

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }

  get light() {
    return this.hasAttribute( 'light' );
  }

  set light( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'light' );
      } else {
        this.setAttribute( 'light', '' );
      }
    } else {
      this.removeAttribute( 'light' );
    }
  }

  get placeholder() {
    if( this.hasAttribute( 'placeholder' ) ) {
      return this.getAttribute( 'placeholder' );
    }

    return null;
  }

  set placeholder( value ) {
    if( value !== null ) {
      this.setAttribute( 'placeholder', value );
    } else {
      this.removeAttribute( 'placeholder' );
    }
  }  

  get readOnly() {
    return this.hasAttribute( 'read-only' );
  }

  set readOnly( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'read-only' );
      } else {
        this.setAttribute( 'read-only', '' );
      }
    } else {
      this.removeAttribute( 'read-only' );
    }
  }  
}

window.customElements.define( 'adc-date-picker', AvocadoDatePicker );
