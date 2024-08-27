import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnChanges{
  @Input() isShowCardHeader: boolean = false;
  @Input() headerClass: string = '';
  @Input() cardBodyClass: string = '';
  @Input() iconClass: string = '';
  @Input() cardHeight: string = '';
  @Input() cardDesign: string = '';
  @Input() headerStyle: string = '';
  @Input() headerTxtClass: string = '';
  @Input() headerTxt: string = '';
  @Input() productImg: string = '';
  @Input() productShortName: string = '';
  @Input() productPrice: number = 0;
  @Input() productRating:number= 0;
  @Output() decrementQuantity = new EventEmitter<void>();
  @Output() incrementQuantity = new EventEmitter<void>();
  @Output() addProductToCart = new EventEmitter<void>();
  @Input() quantity: number = 1;
  @Input() isLoading: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  decrement() {
    this.decrementQuantity.emit();
  }

  increment() {
    this.incrementQuantity.emit();
  }

  addToCart() {
    this.addProductToCart.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
  }
}