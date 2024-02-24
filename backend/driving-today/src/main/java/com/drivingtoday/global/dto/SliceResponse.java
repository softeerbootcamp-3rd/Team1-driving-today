package com.drivingtoday.global.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SliceResponse<T> {

    private List<T> content;
    private Integer currentPage;
    private Integer size;
    private Boolean first;
    private Boolean last;

    public SliceResponse(Slice<T> sliceContent) {
        this.content = sliceContent.getContent();
        this.currentPage = sliceContent.getNumber();
        this.size = sliceContent.getSize();
        this.first = sliceContent.isFirst();
        this.last = sliceContent.isLast();
    }

}
