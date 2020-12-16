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
    </b-container>      
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Transaction",
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
  }    
}
</script>