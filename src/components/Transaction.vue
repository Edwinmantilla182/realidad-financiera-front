<template>
  <div id="Transaction">
    
      <b-row>
        <b-col cols="4">Cantidad:</b-col>
        <b-col cols="8"><b-form-input style="width: 50%" type="text" placeholder="Cantidad" v-model="cantidad" /></b-col>
      </b-row>
      <b-row>
          <b-button variant="dark" v-on:click="makeTransaction">Hacer transacción</b-button>
      </b-row> 
          
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
        value: this.cantidad        
      }

      axios.put("http://localhost:8000/user/transaction/", data)
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