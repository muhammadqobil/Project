import { boot } from 'quasar/wrappers';

export default boot(({ app , store }) => {
  app.mixin({
    data(){
      return{}
    },
    methods: {
      pagedGet(url, pagination, filter, config) {
        const p = url + this.parsePaginationQuery(pagination) + this.tableFilterQuery(filter);
        return this.$axios.get(encodeURI(p), config);
      },
      parsePaginationQuery(pagination) {
        let queryArray = [];

        if (!pagination) {
          return "";
        }
        if (pagination.sortBy) {
          queryArray.push('sortBy=' + pagination.sortBy);

        }
        if (pagination.descending !== undefined)
          queryArray.push('descending=' + pagination.descending);

        if (pagination.page)
          queryArray.push('page=' + pagination.page);
        if (pagination.rowsPerPage)
          queryArray.push('perPage=' + pagination.rowsPerPage);

        if (queryArray.length !== 0)
          return ';' + queryArray.join(';');
        else return ""

      },
      tableFilterQuery(filter) {
        if (!filter) return '';
        let queryArray = [];
        Object.keys(filter).map((objectKey, index) => {
          const value = filter[objectKey];
          if (value === undefined || value === null || value.length === 0)
            return;
          queryArray.push(objectKey + '=' + value);
        });

        if (queryArray.length !== 0)
          return '?' + queryArray.join('&');
        else return ""
      },
      formatPrice(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      },
      showError(error) {
        console.log('----e:', error)
        if (error.type == 'warning') {
          this.$q.notify({
            caption: error.errorMessage + ' [' + error.errorCode + ']',
            message: error.errorDescription,
            icon: 'warning',
            color: 'negative'
          })
        }
        else {
          store.commit('setGlobalError', error);
        }
      },
      showErrorToast(error){
        console.log('----e:', error)

        this.$q.notify({
          position: 'bottom-right',
          caption: error.errorMessage + ' [' + error.errorCode + ']',
          message: error.errorDescription,
          icon: 'warning',
          color: 'dark',
        })
      },
      showErrorNegative(error) {
        this.$q.notify({
          caption: error.errorMessage + ' [' + error.errorCode + ']',
          message: error.errorDescription,
          icon: 'warning',
          color: 'negative'
        })
      },
      showDefaultError() {
        this.showError(this.getDefaultError());
      },
      getDefaultError() {
        return {
          errorCode: -201,
          errorMessage: "System error",
          errorDescription: ""
        }
      },
      showInfo(message) {
        this.$q.notify({
          caption: 'Info',
          message: message,
          icon: 'info',
          color: 'positive'
        })
      },
      showWarnInfo(message) {
        this.$q.notify({
          caption: 'Info',
          message: message,
          icon: 'info',
          color: 'amber'
        })
      },
      ask(title, message, callback) {
        this.$q.notify({
          caption: title,
          message: message,
          timeout: 0,
          icon: 'mdi-comment-question-outline',
          color: 'primary',
          position: 'center',
          actions: [
            {label: app.i18n.global.t('system.No'), color: 'white'},
            {label: app.i18n.global.t('system.Yes'), color: 'yellow', handler: callback},
          ]
        })
      },
      confirmDialog(title, message, callback) {
        this.$q.dialog({
          title: title,
          message: message,
          persistent: true,
          ok: app.i18n.global.t('system.Ok'),
          cancel: app.i18n.global.t('system.Cancel'),
          class: 'bg-primary text-white',
          color: 'white'

        }).onOk(callback)
      },
      paginationOption(){
        return [7,10,20,25,50,100]
      },
      paginationText(firstRowIndex, endRowIndex, totalRowsNumber) {
        return app.i18n.global.t('system.pagination_text', [firstRowIndex, endRowIndex, totalRowsNumber]);
      },
      selectedRowsText(numberOfRows) {
        return app.i18n.global.t('system.selected_rows_text', [numberOfRows]);
      },
      perPageText() {
        return app.i18n.global.t('system.per_page_text');
      },
      noDataText() {
        return app.i18n.global.t('system.no_data');
      },
      number_format(number, decimals, thousands_sep) {
        return number ? number.toFixed(decimals >= 0 ? decimals : 2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (thousands_sep ? thousands_sep : ' ')) : "0"
      },
      number_format_old(number, decimals, dec_point, thousands_sep) {
        let i, j, kw, kd, km;

        if (isNaN(decimals = Math.abs(decimals))) {
          decimals = 2;
        }
        if (dec_point == undefined) {
          dec_point = ".";
        }
        if (thousands_sep == undefined) {
          thousands_sep = " ";
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

        if ((j = i.length) > 3) {
          j = j % 3;
        } else {
          j = 0;
        }

        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

        return km + kw + kd;
      },
      formatCardNumber(value) {
        let val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{4})+(?!\d))/g, " ")
      },
      num_format(num, dig, dec, sep) {
        if (num == null || num == undefined) {
          return;
        }
        num = '' + num;
        num = num.replace(',', '.');
        let x = new Array();
        let s = (num < 0 ? "-" : "");
        num = Math.abs(num).toFixed(dig).split(".");
        let r = num[0].split("").reverse();
        for (let i = 1; i <= r.length; i++) {
          x.unshift(r[i - 1]);
          if (i % 3 == 0 && i != r.length)
            x.unshift(sep);
        }
        return s + x.join("") + (num[1] ? dec + num[1] : "");
      },
      lpad(val, length, sep) {
        if (val === null || val === undefined) {
          return;
        }
        val = '' + val;
        if (length && length > val.length){
          let l = length - val.length;
          let x = Array(l+1).join(sep?sep:'');
          val = x + '' + val;
        }
        return val;
      },
      phone_format(phone) {

        let retval;
        if (!!phone) {
          if (phone.length === 9) {
            retval = "(" + phone.substring(0, 2) + ") " + phone.substring(2, 5) + "-" + phone.substring(5, 7) + "-" + phone.substring(7, 9)
          } else {
            retval = phone
          }
        } else {
          retval = " - "
        }
        return retval;
      },

      // datePickerOptions(date) {
      //   return date <= getCurrentDateForQDate();
      // },
      scrollTo(elId, headerOffset) {
        let element = document.getElementById(elId),
          bodyRect = document.body.getBoundingClientRect(),
          elemRect = element.getBoundingClientRect(),
          offset   = elemRect.top - bodyRect.top;


        window.scrollTo({
          top: offset - headerOffset,
          behavior: "smooth"
        });
      },

      formatBankAccount(value) {
        if (!value) {
          return '';
        }
        return value.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1 ');
      },

      parseToJsonCert(certs) {
        let retval = [];
        let cert = {};
        for (let k in certs) {
          cert = certs[k];
          this.$set(cert, 'certAlias', this.aliasParseToJson(cert.alias));
          retval.push(cert);
        }
        return retval;
      },

      setLength(text, size) {
        if (!!text) {
          if ((!!text) && text.length > size) {
            return text.substring(0, size) + '...'
          } else {
            return text
          }
        }
      },

      parseToJsonCertNew(certs) {
        let result = [];
        if (certs) {
          certs.forEach(element => {
            let el = {}
            let alias = {};
            for (let r in this.aliasParseToJson(element.alias)) {
              alias = this.aliasParseToJson(element.alias)[r];
              this.$set(el, r, alias);
            }
            this.$set(element, 'el', el)
            result.push(element);
          })
        }

        return result;
      },

      aliasParseToJson(alias) {
        let retval = {};
        let splittedStr;

        for (let k in alias.split(',')) {

          splittedStr = alias.split(',')[k];
          if (splittedStr.match(/cn=/g) !== null) {
            this.$set(retval, 'cn', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/name=/g)) {
            this.$set(retval, 'name', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/surname=/g)) {
            this.$set(retval, 'surname', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/o=/g)) {
            this.$set(retval, 'o', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/l=/g)) {
            this.$set(retval, 'l', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/st=/g)) {
            this.$set(retval, 'st', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/c=/g)) {
            this.$set(retval, 'c', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/uid=/g)) {
            this.$set(retval, 'uid', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/1.2.860.3.16.1.2=/g)) {
            this.$set(retval, 'pinfl', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/t=/g)) {
            this.$set(retval, 't', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/serialnumber=/g)) {
            this.$set(retval, 'serialnumber', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/validfrom=/g)) {
            this.$set(retval, 'validfrom', splittedStr.split('=')[1]);
          }
          if (splittedStr.match(/validto=/g)) {
            this.$set(retval, 'validto', splittedStr.split('=')[1]);
          }
        }

        return retval;

      }
    }

  })
})
