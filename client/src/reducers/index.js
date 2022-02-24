const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    dogsDetail: [],
    
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
        case "GET_NAME_DOGS":
            return {
                ...state,
                dogs: action.payload,
            };
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload,
            };
        case "FILTER_BY_TEMPERAMENTS":
            const allDogs = state.allDogs;
            const temperamentFiltered =
                action.payload === "Temperaments"
                    ? allDogs
                    : allDogs.filter(
                          (el) =>
                              el.temperament &&
                              el.temperament
                                  .split(", ")
                                  .find((e) => e === action.payload)
                      );
            console.log("filtro temperamentos", temperamentFiltered);
            return {
                ...state,
                dogs: temperamentFiltered,
            };
        case "FILTER_BY_DBAPI":
            const createdFilter =
                action.payload === "Created"
                    ? state.allDogs.filter((el) => el.createdInDb)
                    : state.allDogs.filter((el) => !el.createdInDb);
            console.log("filtrocreate", createdFilter);
            return {
                ...state,
                dogs: createdFilter,
            };
        case "ORDER_BY_NAME":
            let arr =
                action.payload === "asc"
                    ? state.dogs.sort(function (a, b) {
                          if (a.name > b.name) {
                              return 1;
                          }
                          if (b.name > a.name) {
                              return -1;
                          }
                          return 0;
                      })
                    : state.dogs.sort(function (a, b) {
                          if (a.name > b.name) {
                              return -1;
                          }
                          if (b.name > a.name) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                dogs: arr,
            };
        case "CREATE_DOG":
            return {
                ...state,
            };
        case "DOG_DETAIL":
            return {
                ...state,
                dogsDetail: action.payload,
            };
        case "ORDER_BY_WEIGHT":
            let array =
                action.payload === "ascWeight"
                    ? state.dogs.sort(function (a, b) {
                          if (a.weight_min > b.weight_min) {
                              return 1;
                          }
                          if (b.weight_min > a.weight_min) {
                              return -1;
                          }
                          return 0;
                      })
                    : state.dogs.sort(function (a, b) {
                          if (a.weight_min > b.weight_min) {
                              return -1;
                          }
                          if (b.weight_min > a.weight_min) {
                              return 1;
                          }
                          return 0;
                      });
            return {
                ...state,
                dogs: array,
            };
         case "GET_CLEAN":
             return{
                 ...state,
                 dogsDetail:[],
             }
        default:
            return state;
    }
}

export default rootReducer;
