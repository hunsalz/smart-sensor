<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <validation-observer ref="obs">
          <v-card class="elevation-12" slot-scope="{invalid,validated}">
            <v-toolbar color="primary">
              <v-toolbar-title class="white--text">{{$t('app.login.name')}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <validation-provider name="Email" rules="required|email">
                  <v-text-field
                    prepend-icon="person"
                    name="email"
                    :label="$t('app.login.email')"
                    type="email"
                    v-model="email"
                    autocomplete="email"
                    slot-scope="{errors,valid}"
                    :error-messages="errors"
                    :success="valid"
                    required
                  ></v-text-field>
                </validation-provider>
                <validation-provider name="Password" rules="required|min:5">
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    :label="$t('app.login.password')"
                    type="password"
                    v-model="password"
                    autocomplete="password"
                    slot-scope="{errors,valid}"
                    :error-messages="errors"
                    :success="valid"
                    required
                  ></v-text-field>
                </validation-provider>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit" :disabled="invalid || !validated">{{$t('app.login.btn')}}</v-btn>
            </v-card-actions>
          </v-card>
        </validation-observer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { ValidationObserver, ValidationProvider } from "vee-validate";

  export default {
    name: "Login",
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data: function() {
      return {
        email: "",
        password: ""
      };
    },
    methods: {
      async submit() {
        const valid = await this.$refs.obs.validate();
        if (valid) {
          this.$store.dispatch("userLogin", {
            email: this.email,
            password: this.password
          });
        }
      }
    }
  };
</script>

<style scoped>
</style>
