import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import * as _ from 'lodash';
@Component({
  selector: 'app-form-nested',
  templateUrl: './form-nested.component.html',
  styleUrls: ['./form-nested.component.css']
})
export class FormNestedComponent implements OnInit {
  public validateForm: FormGroup;
  jsonName: any;
  downloadJsonHref: any;
  exportJson = [
   {
  ebecssvy_name: '',
  tabs: [
    {
      ebecssvy_name: '',
      ecolabcn_no: '',
      ecolab_type: '',
      questions: [
        {
          ecolabcn_no: '',
          ebecssvy_name: '',
          ebecssvy_attributetype: 'TrueFalse',
          ebecssvy_showasdefault: true,
          ebecssvy_mandatorywhenvisible: false,
          ebecssvy_showlistasbuttons: true,
          answers: [
            {
              ebecssvy_name: 'True',
              operations: [
                {
                  operation: 'Hide',
                  optQuestions: [ ]
                }
              ]
            },
            {
              ebecssvy_name: 'False',
              operations: [
                {
                  operation: 'Show',
                  optQuestions: []
                }
              ]
            }
          ]
        },
        {
          ecolabcn_no: '',
          ebecssvy_name: '',
          ebecssvy_attributetype: 'MultiCheckbox',
          ebecssvy_showasdefault: true,
          ebecssvy_mandatorywhenvisible: false,
          answers: [
            { ebecssvy_name: '' }
          ]
        },
        {
          ecolabcn_no: '',
          ebecssvy_name: '备注',
          ebecssvy_attributetype: 'Text',
          ebecssvy_showasdefault: true,
          ebecssvy_italic: '14',
          ebecssvy_mandatorywhenvisible: false
        },
        {
          ecolabcn_no: '',
          ebecssvy_name: '拍照',
          ebecssvy_attributetype: 'Image',
          ebecssvy_showasdefault: true,
          ebecssvy_italic: '14',
          ebecssvy_mandatorywhenvisible: false
        }
      ]
    }
  ]

}
];
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.validateForm = this.fb.group({
      ebecssvy_name: [null, [Validators.required]],
      tabs: this.fb.array([
        this.fb.group({
          ecolabcn_no: [null, [Validators.required]],
          ecolab_type: [null, [Validators.required]],
          ebecssvy_name: [null, [Validators.required]],
          questions: this.fb.array([
            this.fb.group({
              ebecssvy_name: [null, [Validators.required]],
              ebecssvy_attributetype: [null, [Validators.required]],
              ebecssvy_showasdefault: [null, [Validators.required]],
              ebecssvy_mandatorywhenvisible: [null, [Validators.required]],
              ebecssvy_showlistasbuttons: [null, [Validators.required]],
              stepType: [null, [Validators.required]],
              answers: this.fb.array([
                this.fb.control(null)
              ])
            })
          ])

        })
      ])


    });
  }
  get workFlowContent(): FormArray {
    return this.validateForm.get('tabs') as FormArray;
  }
  public addStage(): void {
    this.workFlowContent.push(
      this.fb.group({
        ecolabcn_no: [null, [Validators.required]],
        ecolab_type: [null, [Validators.required]],
        ebecssvy_name: [null, [Validators.required]],
        questions: this.fb.array([
          this.fb.group({
            ebecssvy_name: [null, [Validators.required]],
            ebecssvy_attributetype: [null, [Validators.required]],
            ebecssvy_showasdefault: [null, [Validators.required]],
            ebecssvy_mandatorywhenvisible: [null, [Validators.required]],
            ebecssvy_showlistasbuttons: [null, [Validators.required]],
            stepType: [null, [Validators.required]],
            answers: this.fb.array([
              this.fb.control(null)
            ])
          })
        ]),
      })
    );
  }
  public removeStage(workflowIndex: number): void {
    this.workFlowContent.removeAt(workflowIndex);
  }
// add stage
  public addStep(workflowIndex: number): void {
    (this.workFlowContent.at(workflowIndex).get('questions') as FormArray).push(
      this.fb.group({
        ebecssvy_name: [null, [Validators.required]],
        ebecssvy_attributetype: [null, [Validators.required]],
        ebecssvy_showasdefault: [null, [Validators.required]],
        ebecssvy_mandatorywhenvisible: [null, [Validators.required]],
        ebecssvy_showlistasbuttons: [null, [Validators.required]],
        stepType: [null, [Validators.required]],
        answers: this.fb.array([
          this.fb.control(null)
        ])
      }));
  }
  removeStep(workflowIndex: number, stageIndex: number) {
    (this.workFlowContent.at(workflowIndex).get('questions') as FormArray).removeAt(stageIndex);
  }
// add StepContent
  public addStepContent(stage: FormGroup) {
    (stage.get('answers') as FormArray).push(this.fb.control(null));
  }
  // remove StepContent
  public removeStepContent(stage: FormGroup, stepIndex: number): void {
    (stage.get('answers') as FormArray).removeAt(stepIndex);
  }
  exportData(a: any){
    for (let i = 0; i < a.tabs.length; i++)
    {
      if (a.tabs.length >= 2 && i > 0){
        this.exportJson[0].tabs.push({
          ebecssvy_name: '',
          ecolabcn_no: '',
          ecolab_type: '',
          questions: [
            {
              ecolabcn_no: '',
              ebecssvy_name: '',
              ebecssvy_attributetype: 'TrueFalse',
              ebecssvy_showasdefault: true,
              ebecssvy_mandatorywhenvisible: false,
              ebecssvy_showlistasbuttons: true,
              answers: [
                {
                  ebecssvy_name: 'True',
                  operations: [
                    {
                      operation: 'Hide',
                      optQuestions: [ ]
                    }
                  ]
                },
                {
                  ebecssvy_name: 'False',
                  operations: [
                    {
                      operation: 'Show',
                      optQuestions: []
                    }
                  ]
                }
              ]
            },
            {
              ecolabcn_no: '',
              ebecssvy_name: '',
              ebecssvy_attributetype: 'MultiCheckbox',
              ebecssvy_showasdefault: true,
              ebecssvy_mandatorywhenvisible: false,
              answers: [
                { ebecssvy_name: '' }
              ]
            },
            {
              ecolabcn_no: '',
              ebecssvy_name: '备注',
              ebecssvy_attributetype: 'Text',
              ebecssvy_showasdefault: true,
              ebecssvy_italic: '14',
              ebecssvy_mandatorywhenvisible: false
            },
            {
              ecolabcn_no: '',
              ebecssvy_name: '拍照',
              ebecssvy_attributetype: 'Image',
              ebecssvy_showasdefault: true,
              ebecssvy_italic: '14',
              ebecssvy_mandatorywhenvisible: false
            }
          ]
        });
      }
      if (i === 0){
        this.exportJson[0].ebecssvy_name = a.ebecssvy_name;
      }
      this.exportJson[0].tabs[i].ebecssvy_name = a.tabs[i].ebecssvy_name;
      this.exportJson[0].tabs[i].ecolab_type = 'instmain';
      this.exportJson[0].tabs[i].ecolabcn_no = (i + 1).toString();
      for (let m = 0; m < 4 * (a.tabs[i].questions.length); m++)
      {
        if ( m % 4 === 0){
          if (a.tabs[i].questions.length >= 2){
            this.exportJson[0].tabs[i].questions.push({
              ecolabcn_no: '',
              ebecssvy_name: '',
              ebecssvy_attributetype: 'TrueFalse',
              ebecssvy_showasdefault: true,
              ebecssvy_mandatorywhenvisible: false,
              ebecssvy_showlistasbuttons: true,
              answers: [
                {
                  ebecssvy_name: 'True',
                  operations: [
                    {
                      operation: 'Hide',
                      optQuestions: [ ]
                    }
                  ]
                },
                {
                  ebecssvy_name: 'False',
                  operations: [
                    {
                      operation: 'Show',
                      optQuestions: []
                    }
                  ]
                }
              ]
            });
          }
          this.exportJson[0].tabs[i].questions[m].ecolabcn_no = m.toString();
          this.exportJson[0].tabs[i].questions[m].ebecssvy_name = a.tabs[i].questions[m / 4].ebecssvy_name;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_attributetype = 'TrueFalse';
          this.exportJson[0].tabs[i].questions[m].ebecssvy_showasdefault = true;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_mandatorywhenvisible = true;
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[0].ebecssvy_name = 'True';
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[1].ebecssvy_name = 'False';
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[0].operations[0].operation = 'Hide';
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[0].operations[0].optQuestions[0] = (m + 1).toString();
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[0].operations[0].optQuestions[1] = (m + 2).toString();
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[0].operations[0].optQuestions[2] = (m + 3).toString();
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[1].operations[0].operation = 'Show';
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[1].operations[0].optQuestions[0] = (m + 1).toString();
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[1].operations[0].optQuestions[1] = (m + 2).toString();
          // @ts-ignore
          this.exportJson[0].tabs[i].questions[m].answers[1].operations[0].optQuestions[2] = (m + 3).toString();

        } else if (m % 4 === 1){
          if (a.tabs[i].questions.length >= 2){
            this.exportJson[0].tabs[i].questions.push({
              ecolabcn_no: '',
              ebecssvy_name: '',
              ebecssvy_attributetype: 'MultiCheckbox',
              ebecssvy_showasdefault: true,
              ebecssvy_mandatorywhenvisible: false,
              answers: [
                { ebecssvy_name: '' }
              ]
            });
          }
          this.exportJson[0].tabs[i].questions[m].ecolabcn_no = m.toString();
          this.exportJson[0].tabs[i].questions[m].ebecssvy_name = a.tabs[i].questions[Math.floor(m % 4) - 1].stepType;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_attributetype = 'MultiCheckbox';
          this.exportJson[0].tabs[i].questions[m].ebecssvy_showasdefault = false;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_mandatorywhenvisible = true;

          for (let n = 0; n < a.tabs[i].questions.length; n++)
          {
            this.exportJson[0].tabs[i].questions[m].answers[0].ebecssvy_name = a.tabs[i].questions[i].answers[0];
          }

        } else if (m % 4 === 2){
          if (a.tabs[i].questions.length >= 2){
            this.exportJson[0].tabs[i].questions.push({
              ecolabcn_no: '',
              ebecssvy_name: '备注',
              ebecssvy_attributetype: 'Text',
              ebecssvy_showasdefault: true,
              ebecssvy_italic: '14',
              ebecssvy_mandatorywhenvisible: false
            });
          }
          this.exportJson[0].tabs[i].questions[m].ecolabcn_no = m.toString();
          this.exportJson[0].tabs[i].questions[m].ebecssvy_attributetype = 'Text';
          this.exportJson[0].tabs[i].questions[m].ebecssvy_showasdefault = false;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_mandatorywhenvisible = false;


        }else {
          if (a.tabs[i].questions.length >= 2){
            this.exportJson[0].tabs[i].questions.push({
              ecolabcn_no: '',
              ebecssvy_name: '拍照',
              ebecssvy_attributetype: 'Image',
              ebecssvy_showasdefault: true,
              ebecssvy_italic: '14',
              ebecssvy_mandatorywhenvisible: false
            });
          }
          this.exportJson[0].tabs[i].questions[m].ecolabcn_no = m.toString();
          this.exportJson[0].tabs[i].questions[m].ebecssvy_attributetype = 'ImageCapture';
          this.exportJson[0].tabs[i].questions[m].ebecssvy_showasdefault = true;
          this.exportJson[0].tabs[i].questions[m].ebecssvy_mandatorywhenvisible = false;

        }

      }
      // const copyJson =this.exportJson[0].tabs[i].questions;
      // console.log();
      this.exportJson[0].tabs[i].questions = _.filter(this.exportJson[0].tabs[i].questions, function(o) { return o.ecolabcn_no != ''; });
      console.log(this.exportJson);

    }
    console.log(this.exportJson);
    // @ts-ignore
    // let obj = JSON.parse();
    this.jsonName = this.exportJson[0].ebecssvy_name;
    const theJSON = JSON.stringify(this.exportJson);
    this.exportJson = null;
    const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;

  }
  fileChange(event){
    console.log(event.target.files[0]);

  }

  ngOnInit() {
  }

}

