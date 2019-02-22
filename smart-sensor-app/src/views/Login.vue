<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <validation-observer ref="obs">
          <v-card
            slot-scope="{invalid,validated}"
            class="elevation-12"
          >
            <v-toolbar color="primary">
              <v-toolbar-title class="white--text">
                {{ $t('app.login.name') }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <validation-provider
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    slot-scope="{errors,valid}"
                    v-model="email"
                    prepend-icon="person"
                    name="email"
                    :label="$t('app.login.email')"
                    type="email"
                    autocomplete="email"
                    :error-messages="errors"
                    :success="valid"
                    required
                  />
                </validation-provider>
                <validation-provider
                  name="Password"
                  rules="required|min:5"
                >
                  <v-text-field
                    slot-scope="{errors,valid}"
                    v-model="password"
                    prepend-icon="lock"
                    name="password"
                    :label="$t('app.login.password')"
                    type="password"
                    autocomplete="password"
                    :error-messages="errors"
                    :success="valid"
                    required
                  />
                </validation-provider>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                :disabled="invalid || !validated"
                @click="submit"
              >
                {{ $t('app.login.btn') }}
              </v-btn>
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
          this.$store.dispatch("User/login", {
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