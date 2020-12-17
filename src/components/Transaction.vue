<template>
  <div id="Transaction">
    <b-container>
      <b-row>
        <b-col cols="4">Tipo de ingreso o gasto:</b-col>
        <b-col cols="8"><b-form-input style="width: 30%" type="text" placeholder="Cuenta" v-model="cuenta" /></b-col>
      </b-row>
      <b-row>
        <b-col cols="4">Ingreso:</b-col>
        <b-col cols="8"><b-form-input style="width: 30%" type="text" placeholder="Cantidad" v-model="ingreso" /></b-col>
      </b-row>
      <b-row>
        <b-col cols="4">Egreso:</b-col>
        <b-col cols="8"><b-form-input style="width: 30%" type="text" placeholder="Cantidad" v-model="egreso" /></b-col>
      </b-row>
      <b-row>
          <b-button variant="dark" v-on:click="makeTransaction">Hacer transacción</b-button>
      </b-row>

      <br />
      <b-row>
        <b-table>
          <tr>
            <th>Id de la Transacción</th>
            <th>Usuario</th>
            <th>Tipo de Transacción</th>
            <th>Fecha de la Transacción</th>
            <th>Ingreso</th>
            <th>Egreso</th>
            <th>Saldo actual</th>
          </tr>

          <tr v-for="t in transactions" v-bind:key="t.id_transaction">
            <td>{{ t.id_transaction }}</td>
            <td>{{ t.username }}</td>
            <td>{{ t.cuenta }}</td>
            <td>{{  t.date  }}</td>
            <td>{{  t.income  }}</td>
            <td>{{  t.expense  }}</td>
            <td>{{ t.actual_balance }}</td>
          </tr>
        </b-table>
      </b-row>   
      <div>
        <td><b-table striped hover :items="transactions"></b-table></td>
      </div>  
    </b-container>  
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Transaction",
  data: function (){
    return {
      cuenta: "",
      ingreso: 0,
      egreso: 0,
      transactions: [],
      
    }
  },

  methods: {
    makeTransaction: function() {

      var data = {
        username: localStorage.getItem("current_username"),
        cuenta: this.cuenta,
        income: this.ingreso,
        expense: this.egreso      
      }

      axios.put("https://realidad-financiera-back.herokuapp.com/user/transaction/", data)
      .then(response => {
          alert("La transacción se realizo con exito");
          this.$router.push({name: "user_balance", params: { username: data.username } });
      })
      .catch((error) => {
        alert("ERROR Servidor");
      });
    }
  },
  created: function (){
    var current_username = localStorage.getItem("current_username");
    let self = this;

    axios.get("https://realidad-financiera-back.herokuapp.com/user/transactions/" + current_username)
      .then((result) => {
        self.transactions = result.data;
      })
      .catch((error) => {
        alert("ERROR Servidor");
      });
  }    
}
</script>

<style>

td {
  text-align: center;
}

</style>