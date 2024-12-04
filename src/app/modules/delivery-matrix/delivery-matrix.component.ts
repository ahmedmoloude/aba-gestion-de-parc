import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { RessouresService } from 'app/core/services/ressoures.service';
import { Network, Node, Edge } from 'vis-network';


@Component({
  selector: 'app-delivery-matrix',
  templateUrl: './delivery-matrix.component.html',
  styleUrls: ['./delivery-matrix.component.css']
})
export class DeliveryMatrixComponent implements OnInit {


  spinner : boolean = true;

  nodes: Node[] = [];


  edges: Edge[] = [
  ];



  // create a reference to the Vis.js network
  network: Network | undefined;

  // set the options for the network
  options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    locale: 'en',
    nodes: {
      shape: 'icon',

    },
    edges: {
      length : 500,
      font: {
        size: 10,
        align: 'middle'
      },
      arrows: {
        to: {
          enabled: true
        }
      }

    },
    groups: {
      agency: {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf1ad",
          size: 50,
          color: "#57169a",
        },
      },
      home : {
        shape: "icon",
        icon: {
          face: "'FontAwesome'",
          code: "\uf015",
          size: 50,
        },
      }
    },
    layout: {
      randomSeed : 2000
      // hierarchical: {
      //   // direction: 'UD',
      //   sortMethod: 'hubsize',
      //   nodeSpacing: 200,
      //   levelSeparation: 200
      // }
    }
  };

  // set the container element for the network
  container: HTMLElement | undefined;

  constructor(private ressourcesService : RessouresService) { }

  ngOnInit(): void {
    // get the container element for the network
    this.container = document.getElementById('network');


    this.ressourcesService.getEdges().subscribe((data) => {

      this.spinner = false

      console.log('spinner', this.spinner)

       this.constructNodesAndEdges(data.response)

       console.log('nodes' , this.nodes);
       console.log('edges' , this.edges);

       // create the Vis.js network
       this.network = new Network(this.container, { nodes: this.nodes, edges: this.edges }, this.options);

    } , (err) => {
    })

  }



  constructNodesAndEdges(edgesFromApi) {

    const agencies = new Map(); // Use a Map to group nodes by city_id
    edgesFromApi.forEach((edge) => {
      // Check if the node_from and node_dest have already been added as nodes
      const nodeFromIndex = this.nodes.findIndex(
        (node) => node.id === edge.node_from.city_id
      );
      const nodeDestIndex = this.nodes.findIndex(
        (node) => node.id === edge.node_dest.city_id
      );

      // If node_from has not been added, add it as a node
      if (nodeFromIndex === -1) {
        this.nodes.push(
          {
            id: edge.node_from.city_id,
            label: edge.node_from.city.name + ' - '  + edge.node_from.agency.name,
            group : 'agency'
          }
        );

        const agencyId = edge.node_from.agency.id;
        agencies.set(agencyId, agencyId); // add group to map

      }
      else{
        const agencyId = edge.node_from.agency.id;
        const agency = agencies.get(agencyId);
        if (!agency) {
          this.nodes[nodeFromIndex].label =   this.nodes[nodeFromIndex].label + ' - '  + edge.node_from.agency.name
          agencies.set(agencyId, agencyId); // add group to map
        }
      }

      // If node_dest has not been added, add it as a node
      if (nodeDestIndex === -1) {
        this.nodes.push(
          {
            id: edge.node_dest.city_id,
            label: edge.node_dest.city.name  + ' - '  +  edge.node_dest.agency.name,
            group : 'agency',
          }
        );
        const agencyId = edge.node_dest.agency.id;
        agencies.set(agencyId, agencyId); // add group to map

      }
      else {
        const agencyId = edge.node_dest.agency.id;
        const agency = agencies.get(agencyId);
        if (!agency) {
          this.nodes[nodeDestIndex].label =   this.nodes[nodeDestIndex].label + ' - '  + edge.node_dest.agency.name
          agencies.set(agencyId, agencyId); // add group to map
        }
      }

      console.log('agencies' , agencies)

      const edgeIndex = this.edges.findIndex(
        (e) => e.from === edge.node_from.city_id && e.to === edge.node_dest.city_id
      )

      if(edgeIndex === -1) {
        this.edges.push({
          from:  edge.node_from.city_id, to:  edge.node_dest.city_id, label: ''
        })
      }


    });
  }

}


