<template>
  <div style="width: 100%; height: 100%; overflow-y: scroll; overflow-x: hidden; padding: 10px">
    <v-row class="d-flex justify-content-center align-items-center">
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <apexchart width="230" type="donut" :options="options" :series="series"></apexchart>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #06b5a0; color: white; padding: 10px; margin-top: 15px"
          >
            Test Requested
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <apexchart width="230" type="donut" :options="options2" :series="series2"></apexchart>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #06b5a0; color: white; padding: 10px; margin-top: 15px"
          >
            Test Ordered
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #06b5a0; color: white; padding: 10px; margin-top: 15px"
          >
            Samples Collected
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="
              background-color: #06b5a0;
              color: white;
              padding: 10px;
              margin-top: 15px;
              text-align: center;
            "
          >
            Samples Recieved & Accessioning
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-content-center align-items-center">
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #1fa1e9; color: white; padding: 10px; margin-top: 15px"
          >
            DNA ISO & QC
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #1fa1e9; color: white; padding: 10px; margin-top: 15px"
          >
            Lib Prep Day1 & QC
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #1fa1e9; color: white; padding: 10px; margin-top: 15px"
          >
            Lib Prep Day2 & QC
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #1fa1e9; color: white; padding: 10px; margin-top: 15px"
          >
            NGS
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-content-center align-items-center">
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #c64e85; color: white; padding: 10px; margin-top: 15px"
          >
            Data Analysis
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #c64e85; color: white; padding: 10px; margin-top: 15px"
          >
            Report Generation
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #c64e85; color: white; padding: 10px; margin-top: 15px"
          >
            Data Dispatched
          </div>
        </div>
      </v-col>
      <v-col>
        <div style="background-color: #f4f3f3" class="d-flex flex-column justify-content-between">
          <div class="d-flex justify-content-between align-items-start" style="padding: 5px">
            <p style="text-decoration: underline; color: #1fa1e9">Current</p>
            <v-menu transition="scale-transition" location="left">
              <template v-slot:activator="{ props }">
                <div v-bind="props" class="d-flex align-items-center cursor-pointer">
                  <div>
                    <v-icon icon="mdi mdi-calendar" color="#1FA1E9"></v-icon>
                  </div>
                </div>
              </template>
              <v-list density="compact" location="top">
                <v-list-item>
                  <template v-slot:prepend>
                    <div>Choose a Range</div>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Current
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Week
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Month
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <label @click.stop>
                      <input type="checkbox" />
                      &nbsp; Year
                    </label>
                  </template>
                </v-list-item>
                <v-list-item>
                  <template v-slot:prepend>
                    <div style="text-align: center; color: #eb4c6e">Custom</div>
                  </template>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div>
              <apexchart type="pie" width="300" :options="options3" :series="series3"></apexchart>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center"
            style="background-color: #c64e85; color: white; padding: 10px; margin-top: 15px"
          >
            Patient Feedback
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
const options = {
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: false,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      donut: {
        size: '90%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '22px',
            fontWeight: 600,
            color: undefined,
            offsetY: 5
          },
          value: {
            show: false
          },
          total: {
            show: true,
            showAlways: true,
            label: '60',
            color: '#2996FB'
          }
        }
      }
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#007bff', '#ececec']
}
const options2 = {
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: false,
      offsetX: 0,
      offsetY: 0,
      customScale: 1,
      donut: {
        size: '90%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '22px',
            fontWeight: 600,
            color: undefined,
            offsetY: 5
          },
          value: {
            show: false
          },
          total: {
            show: true,
            showAlways: true,
            label: '60',
            color: '#2996FB'
          }
        }
      }
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  colors: ['#007bff', '#ececec']
}
const options3 = {
  chart: {
    width: 380,
    type: 'pie'
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team E', 'Team E'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }
  ],
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val
    }
  }
}

const series = [100, 100]
const series2 = [100, 100]
const series3 = [10, 10, 10, 10, 10, 10, 40]
</script>
<style></style>
