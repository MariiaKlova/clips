import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

interface Tab {
  tabTitle: string;
  active: boolean;
}

@Component( {
  selector: 'app-tabs-container',
  standalone: false,
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
} )

export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren( TabComponent ) tabs: QueryList<TabComponent> = new QueryList()


  constructor () { }

  ngAfterContentInit () {
    const activeTabs = this.tabs?.filter(
      tab => tab.active
    )
    if ( !activeTabs || activeTabs.length === 0 ) {
      this.selectTab( this.tabs!.first )
    }
  }

  selectTab ( tab: TabComponent ) {
    this.tabs?.forEach( tab => {
      tab.active = false
    } )

    tab.active = true
    return false
  }

  getTabClasses ( tab: Tab ): string {
    const active = 'text-white bg-indigo-400 hover:text-white';
    const inactive = 'hover:text-indigo-400 text-white';
    return `${ tab.active ? active : inactive }`;
  }
}
