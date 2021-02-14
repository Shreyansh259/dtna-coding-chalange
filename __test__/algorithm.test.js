import { mapComponents, removeLocations } from "../objectManipulation";
import responseFromApi from "../data";

describe("test the object mapping", () => {
  it("should have unique keys", () => {
    const mappedObject = mapComponents(
      responseFromApi.data.dashboard.components
    );
    const keys = Object.keys(mappedObject);
    const locations = responseFromApi.data.dashboard.components.map((x) =>
      x.location.substr(0, 2)
    );
    const uniqueLocations = [...new Set(locations)];
    expect(keys).toEqual(uniqueLocations);
  });
  it("when prune locations", () => {
    const compoenents = [
      {
        panelNumber: "22-58883-000",
        panelDescription: "PNL-INR TRIMPLTKAHLUA SPRKL",
        location: "AGAAA",
      },
      {
        panelNumber: "22-69410-000",
        panelDescription: "PNL-SW,SMARTPLX,OVHD,SD,KAHLUA",
        location: "OVLHP",
      },
      {
        panelNumber: "22-73304-000",
        panelDescription: 'IND-AIR RESTR,DASH,18",BLACK',
        location: "DR005",
      },
      {
        panelNumber: "23-12537-007",
        panelDescription: "FUSE-MINI,7.5A,BROWN,MP280,PFD",
        location: "PDF26",
      },
      {
        panelNumber: "23-12537-010",
        panelDescription: "FUSE-MINI,10A,RED,MP280,PFD",
        location: "PDF10",
      },
    ];
    const mappedComponents = mapComponents(compoenents);
    const locations = ["PDF10", "PDF26"];
    const pruneObject = removeLocations(locations, mappedComponents);
    expect(Object.keys(pruneObject["PD"]).length).toEqual(0);
  });
  it("should have all locations as keys", () => {
    const compoenents = [
      {
        panelNumber: "23-12537-007",
        panelDescription: "FUSE-MINI,7.5A,BROWN,MP280,PFD",
        location: "PDF26",
      },
      {
        panelNumber: "23-12537-010",
        panelDescription: "FUSE-MINI,10A,RED,MP280,PFD",
        location: "PDF10",
      },
    ];
    const mappedComponents = mapComponents(compoenents);
    const locations = compoenents.map((x) => x.location);
    expect(Object.keys(mappedComponents["PD"])).toEqual(locations);
  });
});
