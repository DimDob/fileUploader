import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReceiveDialogComponent } from './dialog-overview.component';

describe('FileReceiveDialogComponent', () => {
  let component: FileReceiveDialogComponent;
  let fixture: ComponentFixture<FileReceiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileReceiveDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileReceiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
