<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <q-table
      ref="table"
      :title="$t('titles.Regions')"
      :row-key="rowKey"
      :data="data"
      :dense="$q.screen.lt.md"
      :grid="$q.screen.xs"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      @request="refreshData"
      :selected.sync="selectedRows"
      separator="horizontal"
      color="secondary"
      bordered
      :no-data-label="noDataText()"
      :rows-per-page-label="perPageText()"
      :pagination-label="paginationText"
      :selected-rows-label="selectedRowsText"
      @row-click="rowClick"
      class="sticky-last-column-table"
      style="height: calc(100vh - 130px); overflow-y: auto"

    >
      <template v-slot:no-data="props">
        {{$t('system.no_matching_found')}}
      </template>
      <template v-slot:top="props">
        <div class="fit row items-center">
          <q-space/>
          <q-btn-group>
            <q-btn icon="add" class="bg-primary text-white" @click="rowAdd" dense>
              <q-tooltip content-class="bg-primary">
                {{$t('system.add')}}
              </q-tooltip>
            </q-btn>

            <q-btn :loading="loading" size="md" dense color="primary" icon="mdi-reload" @click.stop="refreshTable(true)">
              <q-tooltip content-class="bg-primary">
                {{ $t('fp_captions.l_reload') }}
              </q-tooltip>
            </q-btn>
          </q-btn-group>

        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn size="sm" dense color="secondary" icon="edit" @click.stop="rowEdit(props.row)" class="q-mr-xs">
            <q-tooltip content-class="bg-secondary">
              {{$t('system.edit')}}
            </q-tooltip>
          </q-btn>
          <q-btn size="sm" dense color="negative" icon="delete" @click.stop="rowDelete(props.row)" class="q-mr-sm">
            <q-tooltip content-class="bg-negative">
              {{$t('system.delete')}}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!--DIALOG-->
    <standart-input-dialog v-model="formDialog" :model-id="bean.id" :on-submit="onSubmit"
                           :on-validation-error="onValidationError">


      <div class="row">
        <q-input v-model="bean.name_ru" :placeholder="$t('captions.l_name_ru')"
                 :label="$t('captions.l_name_ru')"
                 class="q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
        <q-input v-model="bean.name_uz" :placeholder="$t('captions.l_name_uz')"
                 :label="$t('captions.l_name_uz')"
                 class="q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>
        <q-input v-model="bean.name_uk" :placeholder="$t('captions.l_name_uk')"
                 :label="$t('captions.l_name_uk')"
                 class="q-pa-md col-xs-12 col-sm-4 col-md-4 col-lg-4" dense
                 lazy-rules :rules="[val => !!val || this.$t('system.field_is_required')]">
        </q-input>

        <q-input v-model="bean.description" :placeholder="$t('captions.l_description')"
                 :label="$t('captions.l_description')"
                 class="q-pa-md col-xs-12 col-sm-12 col-md-12 col-lg-12" dense
        >
          <template v-slot:prepend="props">
            <q-icon name="mdi-text" color="secondary"/>
          </template>
        </q-input>
      </div>

    </standart-input-dialog>

  </div>
</template>

<script>
import StandartInputDialog from "components/base/StandartInputDialog";
import StandartTable from "src/mixins/StandartTable";
import {urls} from "src/utils/constants";

export default {
  name: "AlarmGraphicWorkTypes",
  components: {StandartInputDialog},
  mixins: [StandartTable],
  data() {
    return {
      apiUrl: urls.ALARM_GRAPHIC_WORK_TYPES,
      loading: false,
      rowKey: 'id',
      selectedRows: [],
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },

      columns: [
        {
          name: 'id',
          field: 'id',
          label: this.$t('captions.l_id'),
          sortable: true,
          align: 'left',
          style: 'width: 1rem'
        },
        {
          name: 'name_ru',
          field: row => row.name_ru,
          label: this.$t('captions.l_name_ru'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'name_uz',
          field: row => row.name_uz,
          label: this.$t('captions.l_name_uz'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },

        {
          name: 'name_uk',
          field: row => row.name_uk,
          label: this.$t('captions.l_name_uk'),
          format: val => `${val}`,
          align: 'left',
          classes: 'col-1',
        },
        {
          name: 'description',
          field: row => row.description,
          label: this.$t('captions.l_description'),
          format: val => `${val}`,
          align: 'left',
        },
        {name: 'actions', align: 'center', label: this.$t('captions.l_actions'), style: "width: 1rem"}
      ],
      data: [],
      beanDefault: {
        id: null,
        name_ru: null,
        name_uz: null,
        name_uk: null,
        description: null
      },
      bean: {},
      formDialog: false,
      editMode: true,

    }
  },
  watch: {
    curLocale: function (val) {

    },
  },
  computed: {
    curLocale: {
      get() {
        return this.$i18n.locale;
      }
    },

  },
  methods: {}
}
</script>

<style scoped>

</style>
